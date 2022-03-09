import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';

export interface OperationResult {
    type: GameOperationType;
    success: boolean;
    message: string;
    data?: unknown;
}
