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
import { defaultSettings } from 'src/utils/default-settings';
import { AppService } from './app.service';
@WebSocketGateway(80, {
    cors: true,
    transports: ['websocket'],
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server | undefined;
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
        this.logger.log('creating game');
        const room = this.service.createRoom(hostname, settings);
        console.log(room.id);
        client.join(room.id);
        client.emit('createGame', room);
    }

    @SubscribeMessage('joinGame')
    handleJoinUser(client: Socket, { gameId, username }) {
        this.logger.log(gameId, username);
        const data = this.service.joinGame(gameId, username);
        if (data) {
            const { player, ...room } = data;
            this.server?.to(gameId).emit('playerConnected', player);
            client.join(gameId);
            client.emit('joinGame', { id: gameId, ...room });
        }
    }

    @SubscribeMessage('startGame')
    handleStartGame(client: Socket, gameId) {
        this.logger.log('starting game' + gameId);
        this.service.startGame(gameId);
        this.server?.to(gameId).emit('startGame');
    }

    @SubscribeMessage('sendMoneyToBank')
    handleSendMoneyToBank(client: Socket, { gameId, userId, money }) {
        this.logger.log('sending money to bank');
        const data = this.service.sendMoneyToBank(gameId, userId, money);
        console.log(data);
        this.server?.to(gameId).emit('bankOperation', data);
    }

    @SubscribeMessage('getMoneyFromBank')
    handleGetMoneyFromBank(client: Socket, { gameId, userId, money }) {
        this.logger.log('getting money from bank');
        const data = this.service.getMoneyFromBank(gameId, userId, money);
        console.log(data);
        this.server?.to(gameId).emit('bankOperation', data);
    }

    @SubscribeMessage('transaction')
    handleSendMoneyToPlayer(client: Socket, { gameId, senderId, receiverId, money }) {
        this.logger.log('sending money to player');
        const data = this.service.doTransaction(gameId, senderId, receiverId, money);
        this.server?.to(gameId).emit('transaction', data);
    }
}
