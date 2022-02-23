import { useSocket } from 'hooks/useSocket';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { usernameAtom } from 'store/username-atom';

export const useJoinGame = () => {
    const socket = useSocket();
    const username = useRecoilValue(usernameAtom);
    const navigate = useNavigate();
    const handleJoin = useCallback(
        (gameId: string) => {
            if (gameId && username) {
                socket?.emit('join', { gameId, username });
                navigate(`game/${gameId}`);
            }
        },
        [username, socket],
    );
    return {
        handleJoin,
    };
};
