import { atom } from 'recoil';

interface AuthState {
    isAuth: boolean;
    username: string | null;
    myId?: string | null;
}

const defaultAuthState: AuthState = {
    isAuth: false,
    username: null,
    myId: localStorage.getItem('myId'),
};

export const authAtom = atom<AuthState>({
    key: 'auth',
    default: defaultAuthState,
});
