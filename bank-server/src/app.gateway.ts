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
import { AppService } from './app.service';
import { BankSettings } from './interfaces/bank-settings';
import { Settings } from './interfaces/settings';

@WebSocketGateway(80, {
    cors: true,
    transports: ['websocket'],
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server | undefined;
    private logger: Logger = new Logger('AppGateway');
    private service: AppService = new AppService();

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
        client.emit('mockData', PlayersMock);
    }

    @SubscribeMessage('createGame')
    handleCreateGame(client: Socket, {idHost, hostname, userStartMoney, bankStartMoney}) {
        
        let bankSettings: BankSettings = {
            bankStartMoney: bankStartMoney
        };

        let settings: Settings = {
            startMoney: userStartMoney, 
            idHost: idHost, 
            bankSettings: bankSettings
        };

        this.logger.log('creating game');
    }
}
