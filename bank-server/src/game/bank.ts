import { BankConfig } from 'src/interfaces/configs/bank-config';
import { Credit } from 'src/interfaces/credit';

export class Bank {
    money: number;
    credits?: Map<string, Credit>;
    constructor({ startMoney, hasCredits }: BankConfig) {
        this.money = startMoney;
        if (hasCredits) {
            this.credits = new Map<string, Credit>();
        }
    }
}
