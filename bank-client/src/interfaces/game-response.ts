import { Bank } from 'interfaces/bank';
import { Player } from 'interfaces/player';
import { Settings } from 'interfaces/settings';

export interface GameResponse {
    id: string;
    players: Array<Player>;
    bank: Bank;
    settings: Settings;
    isStarted: boolean;
}
