import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';

export interface GetCreditOperation {
    type: GameOperationType.GET_CREDIT;
    money: number;
    playerId: string;
}
