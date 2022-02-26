import { Button } from 'components/UI/Button';
import { Input } from 'components/UI/Input';
import { useAuth } from 'hooks/useAuth';
import { useModal } from 'hooks/useModal';
import { useSocket } from 'hooks/useSocket';
import { ChangeEvent, useState, VFC } from 'react';
import { Modal } from 'components/modal/Modal';
import styles from 'components/JoinGameModal/index.module.sass';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'store/auth-atom';

export const JoinGameModal: VFC = () => {
    const { closeModal } = useModal();
    const socket = useSocket();
    const { username } = useRecoilValue(authAtom);
    const [gameId, setGameId] = useState('');
    const handleGameIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGameId(event.target.value);
    };

    const handleJoinClick = () => {
        socket?.emit('join', { gameId, username });
        console.log(`join to game: ${gameId}`);
    };
    return (
        <Modal className={styles.modal}>
            <h2 className={styles.title}>Подключение</h2>
            <Input
                value={gameId}
                onChange={handleGameIdChange}
                placeholder='Введите код'
                className={styles.input}
            />
            <Button onClick={handleJoinClick} className={styles.joinButton}>
                Присоединиться
            </Button>
            <Button onClick={closeModal}>Отмена</Button>
        </Modal>
    );
};
