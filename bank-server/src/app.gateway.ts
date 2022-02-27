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
import { ClientRequest } from 'http';
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

    afterInit(server: Server): void {
        this.logger.log(`AppGateway initialized on port 80`);
    }

    handleConnection(client: Socket): void {
        this.logger.log(`client connected (clientID: ${client.id})`);
    }

    handleDisconnect(client: Socket): void {
        this.logger.log(`client disconnected (clientID: ${client.id})`);
    }
//
    @SubscribeMessage('join')
    handleJoinUser(client: Socket, { gameId, username }) {
        this.logger.log(gameId, username);
        client.emit('mockData', PlayersMock);
        const room = this.service.joinGame(gameId, username);
        if(room)
        {
        client.join(room?.id);
        }
    }

    @SubscribeMessage('createGame')
    handleCreateGame(client: Socket,{ userHostName, settings}) {
        this.logger.log('creating game');
        const room = this.service.createRoom(userHostName, settings);
        client.join(room.gameId);
        client.emit('createGame', room);
    }
    
    @SubscribeMessage('startGame')
    handleStartGame(client: Socket, idGame) {
        this.logger.log('starting game');
        this.service.startGame(idGame);
        this.server?.to(idGame).emit('startGame');
    }

    @SubscribeMessage('sendMoneyToBank')
    handleSendMoneyToBank(client: Socket, {idGame, idUser, amount}) {
        this.logger.log('sending money to bank');
        const roomparams = this.service.sendMoneyToBank(idGame, idUser, amount);
        this.server?.to(idGame).emit('bankOperation',{'user':{id:roomparams?.id, money:roomparams?.money}, 'bankMoney':roomparams?.bank});
    }

    @SubscribeMessage('getMoneyFromBank')
    handleGetMoneyFromBank(client: Socket, {idGame, idUser, amount}) {
        this.logger.log('getting money from bank');
        const roomparams = this.service.getMoneyFromBank(idGame, idUser, amount);
        this.server?.to(idGame).emit('bankOperation',{'user':{ id:roomparams?.id, money:roomparams?.money}, bankMoney:roomparams?.bank});
    }

    @SubscribeMessage('sendMoneyToPlayer')
    handleSendMoneyToPlayer(client: Socket, {idGame, idSender, idReceiver, amount}) {
        this.logger.log('sending money to player');
        const roomparams = this.service.doTransaction(idGame, idSender, idReceiver, amount);
        this.server?.to(idGame).emit('sendMoney', {'receiver':{id:roomparams?.receiverId, money :roomparams?.receiverMoney}, 'sender':{id:roomparams?.senderId,money:roomparams?.senderMoney}});
    }
}
