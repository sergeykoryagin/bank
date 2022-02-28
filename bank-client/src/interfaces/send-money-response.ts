import { Player } from 'interfaces/player';

export interface SendMoneyResponse {
    sender: Pick<Player, 'money' | 'id'>;
    receiver: Pick<Player, 'money' | 'id'>;
    message: string;
}
