import { BankSettings } from 'interfaces/settings/bank-settings';
import { OrderSettings } from 'interfaces/settings/order-settings';

export interface GameSettings {
    startMoney: number;
    maxPLayers: number;
    faceControl: boolean;
    backGroundColor: string;
    hasDice: boolean;
    totalWriteOff: boolean;
    totalPayment: boolean;
    hasUndoRedo: boolean;
    hasMoneyRequests: boolean;
    order: OrderSettings;
    bank: BankSettings;
}
