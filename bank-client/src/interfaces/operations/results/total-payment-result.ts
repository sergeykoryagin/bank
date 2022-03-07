import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';
import { OperationResult } from 'interfaces/operations/results/operation-result';

export interface TotalPaymentResult extends OperationResult {
    type: GameOperationType.TOTAL_PAYMENT;
}
