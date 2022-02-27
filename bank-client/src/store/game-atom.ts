import { GameResponse } from 'interfaces/game-response';
import { atom } from 'recoil';

export const gameAtom = atom<GameResponse | null>({
    key: 'game',
    default: null,
});
