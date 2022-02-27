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

    @SubscribeMessage('create game')
    handleCreateGame(client: Socket, {hostname, userStartMoney, bankStartMoney}) {
        const bankSettings: BankSettings = {
            bankStartMoney: bankStartMoney
        };

        const settings: Settings = {
            startMoney: userStartMoney,
            bankSettings: bankSettings
        };

        const data = this.service.createRoom(hostname, settings);
        client.join(data.gameId);
        client.emit("room created", data);

        this.logger.log('created game: ' + data.gameId);
    }

    @SubscribeMessage('join')
    handleJoinUser(client: Socket, { gameId, username }) {
        let data = this.service.joinGame(gameId, username);

        client.join(gameId);
        client.to(gameId).emit("player join", data);

        this.logger.log(gameId, username);
    }

    @SubscribeMessage('start game')
    handleStartGame(client: Socket, { gameId}) {
        this.service.startGame(gameId);

        client.to(gameId).emit("start game");
        this.logger.log("start game: " + gameId.toString());
    }

    @SubscribeMessage('transaction')
    handleTransaction(client: Socket, { gameId, idSender, idReceiver, amount}) {
        const data = this.service.doTransaction(gameId, idSender, idReceiver, amount);

        client.to(gameId).emit("player transaction", data);
        this.logger.log("player transaction: " + data?.message);
    }

    @SubscribeMessage('send to bank')
    handleSendToBank(client: Socket, { gameId, idUser, amount}) {
        const data = this.service.sendMoneyToBank(gameId, idUser, amount);

        client.to(gameId).emit("send to bank", data);
        this.logger.log("send to bank: " + data?.message);
    }
    
    @SubscribeMessage('get from bank')
    handleGetFromBank(client: Socket, { gameId, idUser, amount}) {
        const data = this.service.getMoneyFromBank(gameId, idUser, amount);

        client.to(gameId).emit("get from bank", data);
        this.logger.log("get from bank: " + data?.message);
    }
}
