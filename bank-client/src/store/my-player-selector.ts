import { selector } from 'recoil';
import { authAtom } from 'store/auth-atom';
import { playersSelector } from 'store/players-selector';

export const myPlayerSelector = selector({
    key: 'my-player',
    get: ({ get }) => {
        const players = get(playersSelector);
        const { myId } = get(authAtom);
        return players?.find((player) => player.id === myId);
    },
});
