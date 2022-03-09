import { GameOperation } from 'src/interfaces/operations/game-operation';

export interface GameMove {
    moveId: string;
    playerId: string;
    operations: GameOperation[];
}
