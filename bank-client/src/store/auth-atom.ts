import { atom } from 'recoil';

interface AuthState {
    isAuth: boolean;
}

const defaultAuthState: AuthState = {
    isAuth: false,
};

export const authAtom = atom<AuthState>({
    key: 'auth',
    default: defaultAuthState,
});
