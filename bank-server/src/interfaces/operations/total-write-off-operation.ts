import { GameOperationType } from 'src/interfaces/operations/game-operation-type.enum';

export interface TotalWriteOffOperation {
    type: GameOperationType.TOTAL_WRITE_OFF;
    money: number;
}
