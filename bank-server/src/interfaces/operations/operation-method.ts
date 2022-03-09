import { GameOperation } from 'src/interfaces/operations/game-operation';
import { OperationResult } from 'src/interfaces/operations/operation-result';

export type OperationMethod = (operation: GameOperation) => OperationResult | void;
