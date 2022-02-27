import { atom } from 'recoil';

export const eventsAtom = atom<Array<string>>({
    key: 'events',
    default: [],
});
