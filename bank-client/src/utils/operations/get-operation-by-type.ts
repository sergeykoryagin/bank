import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';
import { OperationResult } from 'interfaces/operations/results/operation-result';
import { getCredit } from 'utils/operations/get-credit';
import { bankOperation } from 'utils/operations/bank-operation';
import { repaymentCredit } from 'utils/operations/repayment-credit';
import { sendMoneyToPlayer } from 'utils/operations/send-money-to-player';
import { totalPayment } from 'utils/operations/total-payment';
import { totalWriteOff } from 'utils/operations/total-write-off';

export const GameOperations = {
    [GameOperationType.GET_MONEY_FROM_BANK]: bankOperation,
    [GameOperationType.SEND_MONEY_TO_BANK]: bankOperation,
    [GameOperationType.SEND_MONEY_TO_PLAYER]: sendMoneyToPlayer,
    [GameOperationType.TOTAL_PAYMENT]: totalPayment,
    [GameOperationType.TOTAL_WRITE_OFF]: totalWriteOff,
    [GameOperationType.GET_CREDIT]: getCredit,
    [GameOperationType.REPAYMENT_CREDIT]: repaymentCredit,
};

export const getOperationByType = (operationType: GameOperationType) =>
    GameOperations[operationType] as (operation: OperationResult) => void;
