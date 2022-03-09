import { selector } from 'recoil';
import { authAtom } from 'store/auth-atom';
import { gameAtom } from 'store/game-atom';

export const hostSelector = selector({
    key: 'host',
    get: ({ get }) => {
        const game = get(gameAtom);
        const { myId } = get(authAtom);
        return game && game.hostId === myId;
    },
});
