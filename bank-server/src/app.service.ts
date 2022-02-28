import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Room } from './game/room';
import { Settings } from './interfaces/settings';

@Injectable()
export class AppService {
    private rooms: Map<string, Room> = new Map<string, Room>();

    getRoom(id: string): Room | undefined {
        return this.rooms.get(id);
    }

    createRoom(hostname: string, settings: Settings) {
        const id = v4();
        const room = new Room(settings, hostname);
        this.rooms.set(id, room);

        return {
            ...room,
            id,
        };
    }

    startGame(gameId: string): void {
        this.getRoom(gameId)?.startGame();
    }

    joinGame(gameId: string, playerName: string) {
        return this.getRoom(gameId)?.addPlayer(playerName);
    }

    doTransaction(gameId: string, idSender: string, idReceiver: string, amount: number) {
        return this.getRoom(gameId)?.sendMoneyToPlayer(idSender, idReceiver, amount);
    }

    getMoneyFromBank(gameId: string, idUser: string, amount: number) {
        return this.getRoom(gameId)?.getMoneyFromBank(idUser, amount);
    }

    sendMoneyToBank(gameId: string, idUser: string, amount: number) {
        return this.getRoom(gameId)?.sendMoneyToBank(idUser, amount);
    }
}
