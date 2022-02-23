import { ReactElement } from 'react';
import { atom } from 'recoil';

export const modalAtom = atom<ReactElement | null>({
    key: 'modal',
    default: null,
});
