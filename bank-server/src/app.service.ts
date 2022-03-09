import { Injectable } from '@nestjs/common';
import { Game } from 'src/game/game';
import { GameOperation } from 'src/interfaces/operations/game-operation';
import { OperationResult } from 'src/interfaces/operations/operation-result';
import { User } from 'src/interfaces/user';
import { v4 } from 'uuid';
import { GameSettings } from 'src/interfaces/settings/game-settings';

@Injectable()
export class AppService {
    private games: Map<string, Game> = new Map<string, Game>();

    private getGame(id: string): Game | undefined {
        return this.games.get(id);
    }

    createGame(host: User, settings: GameSettings) {
        const id = v4();
        const game = new Game({ host, settings, id });
        this.games.set(id, game);
        return game;
    }

    startGame(gameId: string): void {
        this.getGame(gameId)?.startGame();
    }

    joinGame(gameId: string, user: User & { oldId?: string }) {
        const game = this.getGame(gameId);
        if (game) {
            if (user.oldId && game.getPlayerById(user.oldId)) {
                const player = game.getPlayerById(user.oldId)!;
                player.id = user.id;
                player.username = user.username;
                const hostId = game.hostId;
                if (hostId === user.oldId) {
                    game.hostId = user.id;
                }
                return { game, reconnectedPLayer: player, hostId };
            }
            return {
                game,
                newPlayer: game.addPlayer(user),
            };
        }
    }

    doOperation(gameId: string, operation: GameOperation): OperationResult {
        const game = this.getGame(gameId);
        const operationResult = game?.doOperation(operation);
        return (
            operationResult || {
                success: false,
                message: `Ошибка операции`,
                type: operation.type,
            }
        );
    }
}
