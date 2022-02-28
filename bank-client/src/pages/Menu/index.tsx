import { Button } from 'components/UI/Button';
import { CreateGameModal } from 'components/modals/CreateGameModal';
import { JoinGameModal } from 'components/modals/JoinGameModal';
import { Logo } from 'components/UI/Logo';
import { ModalConstructor } from 'components/modals/modal/ModalConstructor';
import { VFC } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'store/modal-atom';
import styles from './index.module.sass';

export const Menu: VFC = () => {
    const setModal = useSetRecoilState(modalAtom);
    const handleCreateClick = () => {
        setModal(<CreateGameModal />);
    };
    const handleJoinClick = () => {
        setModal(<JoinGameModal />);
    };

    return (
        <div className={styles.menu}>
            <Logo className={styles.logo} />
            <Button onClick={handleCreateClick} className={styles.createButton}>
                Создать комнату
            </Button>
            <Button onClick={handleJoinClick} className={styles.joinButton}>
                Присоединиться
            </Button>
            <ModalConstructor />
        </div>
    );
};
