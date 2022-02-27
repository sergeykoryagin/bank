import { Player } from './player';
import { WithMoney } from '../interfaces/with-money';
import { Bank } from './bank';
import { Settings } from '../interfaces/settings';

export class Room {
    players: Player[];
    bank: Bank;
    isStarted = false;
    settings: Settings;
    constructor(settings: Settings, hostName: string) {
        this.settings = settings;
        this.players = [new Player(hostName, this.settings.startMoney)];
        this.bank = new Bank(this.settings.bankSettings);
    }

    findPlayers(id: string): Player | undefined {
        return this.players.find((player) => id === player.id);
    }

    doTransaction(sender: WithMoney, receiver: WithMoney, amount: number) {
        if (sender.money >= amount) {
            sender.money -= amount;
            receiver.money += amount;
        }
    }

    getMoneyFromBank(idPlayer: string, amount: number) {
        const player = this.findPlayers(idPlayer);
        if (player) {
            this.doTransaction(this.bank, player, amount);

            let notification = " Bank: " + amount.toString() + " -> " + player.username;
            return {
                message: notification,
                id: idPlayer,
                money: player.money,
                bank: this.bank.money
            }
        }
    }

    sendMoneyToBank(idPlayer: string, amount: number) {
        const player = this.findPlayers(idPlayer);
        if (player) {
            this.doTransaction(player, this.bank, amount);
            
            let notification = player.username + ": " + amount.toString() + " -> " +  "Bank";
            return {
                message: notification,
                id: idPlayer,
                money: player.money,
                bank: this.bank.money
            }
        }
    }

    sendMoneyToPlayer(idSender, idReceiver: string, amount: number) {
        const sender = this.findPlayers(idSender);
        const receiver = this.findPlayers(idReceiver);
        if (sender && receiver) {
            let data = this.doTransaction(sender, receiver, amount);
                
            let notification = sender.username + " -> " + amount.toString() + " -> " + receiver.username;
            return {
                    message: notification,
                    senderId: idSender,
                    senderMoney: sender.money,
                    receiverId: idSender,
                    receiverMoney: sender.money,
            };
        }
    }

    addPlayer(playerName: string) {
        if (!this.isStarted) {
            let player = new Player(playerName, this.settings.startMoney);
            this.players.push(player);
            return {id: player.id, name: playerName, money: this.settings.startMoney};
        }
    }

    startGame() {
        if (!this.isStarted) {
            this.isStarted = true;
        }
    }
}
