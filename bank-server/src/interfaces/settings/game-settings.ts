import { OrderSettings } from 'src/interfaces/settings/order-settings';
import { BankSettings } from 'src/interfaces/settings/bank-settings';

export interface GameSettings {
    startMoney: number;
    maxPlayers: number;
    faceControl: boolean;
    backgroundColor: string;
    hasDice: boolean;
    totalWriteOff: boolean;
    totalPayment: boolean;
    hasUndoRedo: boolean;
    hasMoneyRequests: boolean;
    order: OrderSettings;
    bank: BankSettings;
}
