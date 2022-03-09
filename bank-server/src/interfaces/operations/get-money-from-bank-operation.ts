import { GameOperationType } from 'src/interfaces/operations/game-operation-type.enum';

export interface GetMoneyFromBankOperation {
    type: GameOperationType.GET_MONEY_FROM_BANK;
    playerId: string;
    money: number;
}
