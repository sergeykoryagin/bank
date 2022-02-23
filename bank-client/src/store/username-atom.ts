import { atom } from 'recoil';

const TEMP_USER_NAME = 'kek';

export const usernameAtom = atom<string | null>({
    key: 'username',
    default: TEMP_USER_NAME,
});
