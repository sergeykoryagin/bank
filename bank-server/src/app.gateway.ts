import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameOperation } from 'src/interfaces/operations/game-operation';
import { User } from 'src/interfaces/user';
import { defaultSettings } from 'src/utils/default-settings';
import { AppService } from './app.service';

@WebSocketGateway(80, {
    cors: true,
    transports: ['websocket'],
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway');
    private service: AppService = new AppService();

    afterInit(): void {
        this.logger.log(`AppGateway initialized on port 80`);
    }

    handleConnection(client: Socket): void {
        this.logger.log(`client connected (clientID: ${client.id})`);
    }

    handleDisconnect(client: Socket): void {
        this.logger.log(`client disconnected (clientID: ${client.id})`);
    }

    @SubscribeMessage('createGame')
    handleCreateGame(client: Socket, { hostname, settings = defaultSettings }) {
        const host: User = {
            username: hostname,
            id: client.id,
        };
        const game = this.service.createGame(host, settings);
        client.join(game.id);
        client.emit('createGame', game);
        this.logger.log(`Game with id: ${game.id} is created by user: ${JSON.stringify(host)}`);
    }

    @SubscribeMessage('joinGame')
    handleJoinUser(client: Socket, { gameId, username, oldId }) {
        const user: User & { oldId?: string } = {
            username,
            id: client.id,
            oldId,
        };
        const data = this.service.joinGame(gameId, user);
        if (data) {
            const { newPlayer, game, reconnectedPLayer, hostId } = data;
            newPlayer && this.server?.to(gameId).emit('playerConnected', newPlayer);
            reconnectedPLayer &&
                this.server
                    ?.to(gameId)
                    .emit('playerReconnected', { ...reconnectedPLayer, oldId }, hostId);
            client.join(gameId);
            client.emit('joinGame', game, user.id);
        }
        this.logger.log(`User: ${JSON.stringify(user)} connected to game: ${gameId}`);
    }

    @SubscribeMessage('startGame')
    handleStartGame(client: Socket, gameId) {
        this.service.startGame(gameId);
        this.server?.to(gameId).emit('startGame');
        this.logger.log(`Game: ${gameId} is started`);
    }

    @SubscribeMessage('operation')
    handleOperation(
        client: Socket,
        { gameId, operation }: { gameId: string; operation: GameOperation },
    ) {
        const operationResult = this.service.doOperation(gameId, operation);
        this.server?.to(gameId).emit('operation', operationResult);
        this.logger.log(`Operation in game: ${gameId}, operation: ${operationResult.message}`);
    }
}
