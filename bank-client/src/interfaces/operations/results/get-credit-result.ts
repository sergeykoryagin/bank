import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';
import { OperationResult } from 'interfaces/operations/results/operation-result';
import { UserWithMoney } from 'interfaces/user-with-money';

export interface GetCreditResult extends OperationResult {
    type: GameOperationType.GET_CREDIT;
}
