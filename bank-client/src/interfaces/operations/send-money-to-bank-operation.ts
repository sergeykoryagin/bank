import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';

export interface SendMoneyToBankOperation {
    type: GameOperationType.SEND_MONEY_TO_BANK;
    money: number;
    playerId: string;
}
