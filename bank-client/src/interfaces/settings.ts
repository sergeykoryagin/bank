import { BankSettings } from 'interfaces/bank-settings';

export interface Settings {
    startMoney: number;
    maxPlayers: number;
    bankSettings: BankSettings;
}
