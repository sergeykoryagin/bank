import { WithMoney } from '../interfaces/with-money';
import { BankSettings } from '../interfaces/bank-settings';

export class Bank implements WithMoney {
    money: number;
    constructor(bankSettings: BankSettings) {
        this.money = bankSettings.bankStartMoney;
    }
}
