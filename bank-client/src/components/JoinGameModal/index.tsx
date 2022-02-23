import { Modal } from 'components/modal/Modal';
import { ChangeEvent, useState, VFC } from 'react';

export const JoinGameModal: VFC = () => {
    const [gameId, setGameId] = useState('');
    const handleGameIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGameId(event.target.value);
    };
    const handleJoinClick = () => {
        console.log(`join to game: ${gameId}`);
    };
    return (
        <Modal>
            <h2>Присоединиться к игре</h2>
            <input value={gameId} onChange={handleGameIdChange} />
            <button onClick={handleJoinClick}>Присоединиться</button>
        </Modal>
    );
};
