import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';
import { OperationResult } from 'interfaces/operations/results/operation-result';
import { UserWithMoney } from 'interfaces/user-with-money';

export interface BankOperationResult extends OperationResult {
    type: GameOperationType.SEND_MONEY_TO_BANK | GameOperationType.GET_MONEY_FROM_BANK;
    data: {
        bankMoney: number;
        user: UserWithMoney;
    };
}
