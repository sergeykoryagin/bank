import { GameOperationType } from 'src/interfaces/operations/game-operation-type.enum';

export interface RepaymentCreditOperation {
    type: GameOperationType.REPAYMENT_CREDIT;
    money: number;
    playerId: string;
}
