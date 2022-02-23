import { VFC } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { mockPlayersAtom } from 'store/mock-players-atom';

type LocationParams = {
    gameId: string;
};

export const Game: VFC = () => {
    const { gameId } = useParams<LocationParams>();
    const mockPlayers = useRecoilValue(mockPlayersAtom);

    return (
        <div>
            <div>Game id: {gameId}</div>
            <ul>
                {mockPlayers.map((player) => (
                    <li key={player.id}>{player.username}</li>
                ))}
            </ul>
        </div>
    );
};
