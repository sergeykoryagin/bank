import { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { mockPlayersAtom } from 'store/mock-players-atom';

export const Game: VFC = () => {
    const mockPlayers = useRecoilValue(mockPlayersAtom);

    return (
        <div>
            <div>Game</div>
            <ul>
                {mockPlayers.map((player) => (
                    <li key={player.id}>{player.username}</li>
                ))}
            </ul>
        </div>
    );
};
