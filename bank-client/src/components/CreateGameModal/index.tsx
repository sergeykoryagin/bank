import { Button } from 'components/Button';
import { useModal } from 'hooks/useModal';
import { VFC } from 'react';
import { Modal } from 'components/modal/Modal';
import styles from './index.module.sass';

export const CreateGameModal: VFC = () => {
    const { closeModal } = useModal();
    const handleCreateGameClick = () => {
        console.log('create game');
    };

    return (
        <Modal className={styles.modal}>
            <div className={styles.titleWrapper}>
                <h2 className={styles.title}>Создание игры</h2>
            </div>
            <Button onClick={handleCreateGameClick} className={styles.createButton}>
                Создать
            </Button>
            <Button onClick={closeModal}>Отмена</Button>
        </Modal>
    );
};
