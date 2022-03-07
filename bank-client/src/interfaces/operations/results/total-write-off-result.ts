import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';
import { OperationResult } from 'interfaces/operations/results/operation-result';

export interface TotalWriteOffResult extends OperationResult {
    type: GameOperationType.TOTAL_WRITE_OFF;
}
