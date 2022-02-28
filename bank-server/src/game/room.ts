import { Player } from './player';
import { WithMoney } from '../interfaces/with-money';
import { Bank } from './bank';
import { Settings } from '../interfaces/settings';

export class Room {
    players: Player[];
    hostId: string;
    bank: Bank;
    isStarted = false;
    settings: Settings;
    constructor(settings: Settings, hostName: string) {
        this.settings = settings;
        this.players = [new Player(hostName, this.settings.startMoney, 0)];
        this.hostId = this.players[0].id;
        this.bank = new Bank(this.settings.bankSettings);
    }

    findPlayers(id: string): Player | undefined {
        return this.players.find((player) => id === player.id);
    }

    private static doTransaction(sender: WithMoney, receiver: WithMoney, amount: number) {
        if (sender.money >= amount) {
            sender.money -= amount;
            receiver.money += amount;
        }
    }

    getMoneyFromBank(idPlayer: string, amount: number) {
        const player = this.findPlayers(idPlayer);
        if (player) {
            Room.doTransaction(this.bank, player, amount);

            const notification = ' Bank -> ' + amount.toString() + ' -> ' + player.username;
            return {
                message: notification,
                user: {
                    id: idPlayer,
                    money: player.money,
                },
                bankMoney: this.bank.money,
            };
        }
    }

    sendMoneyToBank(idPlayer: string, amount: number) {
        const player = this.findPlayers(idPlayer);
        if (player) {
            Room.doTransaction(player, this.bank, amount);

            const notification = player.username + ' -> ' + amount.toString() + ' -> ' + 'Bank';
            return {
                message: notification,
                user: {
                    id: idPlayer,
                    money: player.money,
                },
                id: idPlayer,
                bankMoney: this.bank.money,
            };
        }
    }

    sendMoneyToPlayer(idSender, idReceiver: string, amount: number) {
        const sender = this.findPlayers(idSender);
        const receiver = this.findPlayers(idReceiver);
        if (sender && receiver) {
            Room.doTransaction(sender, receiver, amount);

            const notification =
                sender.username + ' -> ' + amount.toString() + ' -> ' + receiver.username;
            return {
                message: notification,
                sender: {
                    id: idSender,
                    money: sender.money,
                },
                receiver: {
                    id: idReceiver,
                    money: receiver.money,
                },
            };
        }
    }

    addPlayer(playerName: string) {
        if (!this.isStarted) {
            const player = new Player(
                playerName,
                this.settings.startMoney,
                this.players.length || 0,
            );
            this.players.push(player);
            return { ...this, player };
        }
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter((player) => player.id !== playerId);

        return { id: playerId };
    }

    startGame() {
        if (!this.isStarted) {
            this.isStarted = true;
        }
    }
}
