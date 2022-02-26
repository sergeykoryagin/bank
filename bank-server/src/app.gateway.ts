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
import { PlayersMock } from 'src/mocks/players.mock';

@WebSocketGateway(80, {
    cors: true,
    transports: ['websocket'],
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server | undefined;
    private logger: Logger = new Logger('AppGateway');

    afterInit(server: Server): void {
        this.logger.log(`AppGateway initialized on port 80`);
    }

    handleConnection(client: Socket): void {
        this.logger.log(`client connected (clientID: ${client.id})`);
    }

    handleDisconnect(client: Socket): void {
        this.logger.log(`client disconnected (clientID: ${client.id})`);
    }

    @SubscribeMessage('join')
    handleJoinUser(client: Socket, { gameId, username }) {
        this.logger.log(gameId, username);
    }
}
