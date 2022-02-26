import { Injectable } from '@nestjs/common';
import { hostname } from 'os';
import { Room } from './game/room';
import { BankSettings } from './interfaces/bank-settings';
import { Settings } from './interfaces/settings';

@Injectable()
export class AppService {
    private rooms: Room[] = [];

    findRoom(id: string): Room | undefined {
        return this.rooms.find((room) => id === room.id);
    }

    createRoom(idHost: number, hostname: string, userStartMoney: number, bankStartMoney: number) {
        let bankSettings: BankSettings = {bankStartMoney: bankStartMoney};
        let settings: Settings = {startMoney: userStartMoney, idHost: idHost, bankSettings: bankSettings};
        
        this.rooms.push(new Room(settings, hostname));
    }

    startGame(idGame: string) {
        this.findRoom(idGame)?.startGame();
    }

    joinGame(idGame: string, playerName: string) {
        this.findRoom(idGame)?.addPlayer(playerName);
    }

    doTransaction(idGame: string, idSender: string, idReceiver: string, amount: number) {
        this.findRoom(idGame)?.sendMoneyToPlayer(idSender, idReceiver, amount);
    }

    getMoneyFromBank(idGame: string, idUser: string, amount: number) {
        this.findRoom(idGame)?.getMoneyFromBank(idUser, amount);
    }

    sendMoneyToBank(idGame: string, idUser: string, amount: number) {
        this.findRoom(idGame)?.sendMoneyToBank(idUser, amount);
    }
}
