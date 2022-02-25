import { Button } from 'components/UI/Button';
import { Input } from 'components/UI/Input';
import { useModal } from 'hooks/useModal';
import { ChangeEvent, useState, VFC } from 'react';
import { Modal } from 'components/modal/Modal';
import styles from 'components/JoinGameModal/index.module.sass';

export const JoinGameModal: VFC = () => {
    const { closeModal } = useModal();
    const [gameId, setGameId] = useState('');
    const handleGameIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGameId(event.target.value);
    };

    const handleJoinClick = () => {
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
