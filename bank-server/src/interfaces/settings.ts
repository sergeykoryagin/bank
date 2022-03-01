import { BankSettings } from './bank-settings';

export interface Settings {
    startMoney: number;
    maxPLayers: number;
    bankSettings: BankSettings;
}
