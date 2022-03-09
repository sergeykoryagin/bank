import { Bank } from 'interfaces/bank';
import { Player } from 'interfaces/player';
import { GameSettings } from 'interfaces/settings/game-settings';

export interface GameResponse {
    id: string;
    players: Array<Player>;
    bank: Bank;
    hostId: string;
    settings: GameSettings;
    isStarted: boolean;
}
