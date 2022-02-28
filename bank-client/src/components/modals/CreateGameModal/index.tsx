import { FormEvent, useCallback, VFC } from 'react';
import { Button } from 'components/UI/Button';
import { useModal } from 'hooks/useModal';
import { useSocket } from 'hooks/useSocket';
import { Modal } from 'components/modals/modal/Modal';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'store/auth-atom';
import styles from 'components/modals/CreateGameModal/index.module.sass';

export const CreateGameModal: VFC = () => {
    const { closeModal } = useModal();
    const { username } = useRecoilValue(authAtom);
    const socket = useSocket();

    const handleCreateGameClick = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            socket?.emit('createGame', { hostname: username });
        },
        [username, socket],
    );

    return (
        <Modal className={styles.modal}>
            <h2 className={styles.title}>Создание игры</h2>
            <form onSubmit={handleCreateGameClick} className={styles.form}>
                <div className={styles.fields} />
                <Button className={styles.createButton} type='submit'>
                    Создать
                </Button>
                <Button onClick={closeModal} type='button'>
                    Отмена
                </Button>
            </form>
        </Modal>
    );
};
