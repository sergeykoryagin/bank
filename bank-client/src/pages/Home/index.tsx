import { useJoinGame } from 'hooks/useJoinGame';
import { VFC } from 'react';

const GAME_ID = '123121';

export const Home: VFC = () => {
    const { handleJoin } = useJoinGame();

    const handleJoinClick = () => {
        handleJoin(GAME_ID);
    };

    return (
        <div>
            Home page
            <button onClick={handleJoinClick}>Войти</button>
        </div>
    );
};
