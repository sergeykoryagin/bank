import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Room } from './game/room';
import { Server, Socket } from 'socket.io';
import { BankSettings } from './interfaces/bank-settings';
import { Settings } from './interfaces/settings';
import { IoAdapter } from '@nestjs/platform-socket.io';

@Injectable()
export class AppService {
    private rooms: Map<string, Room> = new Map<string, Room>();

    getRoom(id: string): Room | undefined {
        return this.rooms.get(id);
    }

    createRoom(client: Socket, hostname, string, settings: Settings): string {
        const id = v4();
        
        this.rooms.set(id, new Room(settings, hostname));

        client.join(id);
        client.emit("room created", {id: id, money: settings.startMoney});

        return id;
    }

    startGame(client: Socket, idGame: string): void {
        this.getRoom(idGame)?.startGame();
        client.to(idGame).emit("start game");
    }

    joinGame(client: Socket, idGame: string, playerName: string) {
        let playerInfo = this.getRoom(idGame)?.addPlayer(playerName);

        client.join(idGame);
        client.to(idGame).emit("player join", playerInfo);
    }

    doTransaction(client: Socket, idGame: string, idSender: string, idReceiver: string, amount: number) {
        let data = this.getRoom(idGame)?.sendMoneyToPlayer(idSender, idReceiver, amount);

        client.to(idGame).emit("player transaction", data);
    }

    getMoneyFromBank(client: Socket, idGame: string, idUser: string, amount: number) {
        let data = this.getRoom(idGame)?.getMoneyFromBank(idUser, amount);
        
        client.to(idGame).emit("bank transaction", data);
    }

    sendMoneyToBank(client: Socket, idGame: string, idUser: string, amount: number) {
        let data = this.getRoom(idGame)?.sendMoneyToBank(idUser, amount);

        client.to(idGame).emit("bank transaction", data);
    }
}
