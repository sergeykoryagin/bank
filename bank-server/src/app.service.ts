import { Injectable } from '@nestjs/common';
import { Room } from './game/room';

@Injectable()
export class AppService {
    private rooms: Room[];

    createRoom(idHost: number, nameHost: string, userStartMoney: number, bankStartMoney: number) {

    }

    startGame(idGame: number) {

    }

    joinGame(idGame: number, idUser: number, nameUser: string) {

    }

    doTransaction(idGame: number, idSender: number, idReceiver: number, amount: number) {

    }

    getMoneyFromBank(idGame: number, idUser: number, amount: number) {

    }

    sendMoneyFromBank(idGame: number, idUser: number, amount: number) {
        
    }
}
