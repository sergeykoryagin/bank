import { CreateGameModal } from 'components/CreateGameModal';
import { JoinGameModal } from 'components/JoinGameModal';
import { ModalConstructor } from 'components/modal/ModalConstructor';
import { VFC } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'store/modal-atom';

export const Menu: VFC = () => {
    const setModal = useSetRecoilState(modalAtom);
    const handleCreateClick = () => {
        setModal(<CreateGameModal />);
    };
    const handleJoinClick = () => {
        setModal(<JoinGameModal />);
    };

    return (
        <div>
            <button onClick={handleCreateClick}>Создать комнату</button>
            <button onClick={handleJoinClick}>Присоединиться</button>
            <ModalConstructor />
        </div>
    );
};
