import { selector } from 'recoil';
import { gameAtom } from 'store/game-atom';

export const playersSelector = selector({
    key: 'players',
    get: ({ get }) => {
        const lobby = get(gameAtom);
        return lobby?.players;
    },
});
