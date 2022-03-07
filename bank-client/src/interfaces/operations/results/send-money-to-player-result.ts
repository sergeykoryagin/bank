import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';
import { OperationResult } from 'interfaces/operations/results/operation-result';
import { UserWithMoney } from 'interfaces/user-with-money';

export interface SendMoneyToPlayerResult extends OperationResult {
    type: GameOperationType.SEND_MONEY_TO_PLAYER;
    data: {
        sender: UserWithMoney;
        receiver: UserWithMoney;
    };
}
