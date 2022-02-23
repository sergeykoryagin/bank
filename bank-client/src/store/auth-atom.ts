import { atom } from 'recoil';

interface AuthState {
    isAuth: boolean;
    username: string | null;
}

const defaultAuthState: AuthState = {
    isAuth: false,
    username: null,
};

export const authAtom = atom<AuthState>({
    key: 'auth',
    default: defaultAuthState,
});
