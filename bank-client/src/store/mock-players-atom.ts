import { atom } from 'recoil';

export interface MockPlayer {
    id: string;
    username: string;
}

export const mockPlayersAtom = atom<Array<MockPlayer>>({
    key: 'test',
    default: [],
});
