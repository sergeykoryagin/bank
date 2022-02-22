import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class AppGateway {
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): void {
        console.log(payload);
    }
}
