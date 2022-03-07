import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';
import { OperationResult } from 'interfaces/operations/results/operation-result';

export interface RepaymentCreditResult extends OperationResult {
    type: GameOperationType.REPAYMENT_CREDIT;
}
