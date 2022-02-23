import { ChangeEvent, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authAtom } from 'store/auth-atom';

export const useAuth = () => {
    const [name, setName] = useState(localStorage.getItem('username') || '');
    const setAuthState = useSetRecoilState(authAtom);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleUsernameSubmit = () => {
        setAuthState({ isAuth: true, username: name });
        localStorage.setItem('username', name);
    };

    return {
        name,
        handleNameChange,
        handleUsernameSubmit,
    };
};
