import { Game } from 'src/game/game';
import { defaultSettings } from 'src/utils/default-settings';

describe('Game class', () => {
    it('should be initialized', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: defaultSettings,
        });
        expect(game).toBeDefined();
    });
});
