import { BankSettings } from 'interfaces/settings/bank-settings';
import { OrderSettings } from 'interfaces/settings/order-settings';

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
