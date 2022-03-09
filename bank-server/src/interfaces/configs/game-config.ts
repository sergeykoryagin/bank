import { GameSettings } from 'src/interfaces/settings/game-settings';
import { User } from 'src/interfaces/user';

export interface GameConfig {
    id: string;
    host: User;
    settings: GameSettings;
}
