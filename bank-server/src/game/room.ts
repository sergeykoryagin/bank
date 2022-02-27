import { v4 } from 'uuid';
import { Player } from './player';
import { WithMoney } from '../interfaces/with-money';
import { Bank } from './bank';
import { Settings } from '../interfaces/settings';

export class Room {
    id: string;
    players: Player[];
    hostId: string;
    bank: Bank;
    isStarted = false;
    settings: Settings;
    constructor(settings: Settings, hostName: string) {
        this.id = v4();
        this.settings = settings;
        this.players = [new Player(hostName, this.settings.startMoney)];
        this.hostId = this.players[0].id;
        this.bank = new Bank(this.settings.bankSettings);
    }

    findPlayers(id: string): Player | undefined {
        return this.players.find((player) => id === player.id);
    }

    doTransaction(sender: WithMoney, receiver: WithMoney, amount: number) {
        if (sender.money <= amount) {
            sender.money -= amount;
            receiver.money += amount;
        }
    }

    getMoneyFromBank(idPlayer: string, amount: number) {
        const player = this.findPlayers(idPlayer);
        if (player) {
            this.doTransaction(this.bank, player, amount);
        }
    }

    sendMoneyToBank(idPlayer: string, amount: number) {
        const player = this.findPlayers(idPlayer);
        if (player) {
            this.doTransaction(player, this.bank, amount);
        }
    }

    sendMoneyToPlayer(idSender, idReceiver: string, amount: number) {
        const sender = this.findPlayers(idSender);
        const receiver = this.findPlayers(idReceiver);
        if (sender && receiver) {
            this.doTransaction(sender, receiver, amount);
        }
    }

    addPlayer(playerName: string) {
        if (!this.isStarted) {
            this.players.push(new Player(playerName, this.settings.startMoney));
        }
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter((player) => player.id !== playerId);
    }

    startGame() {
        if (!this.isStarted) {
            this.isStarted = true;
        }
    }
}
