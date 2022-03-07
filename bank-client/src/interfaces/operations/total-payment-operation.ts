import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';

export interface TotalPaymentOperation {
    type: GameOperationType.TOTAL_PAYMENT;
    money: number;
}
