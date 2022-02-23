import { Modal } from 'components/modal/Modal';
import { VFC } from 'react';

export const CreateGameModal: VFC = () => {
    const handleCreateGameClick = () => {
        console.log('create game');
    };

    return (
        <Modal>
            <h2>Создать игру</h2>
            <button onClick={handleCreateGameClick}>Создать</button>
        </Modal>
    );
};
