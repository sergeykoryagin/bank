import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';

export interface SendMoneyToPlayerOperation {
    type: GameOperationType.SEND_MONEY_TO_PLAYER;
    money: number;
    receiverId: string;
    senderId: string;
}
