import { useRecoilState } from 'recoil';
import { modalAtom } from 'store/modal-atom';

export const useModal = () => {
    const [modal, setModal] = useRecoilState(modalAtom);

    const closeModal = () => setModal(null);

    return {
        closeModal,
        modal,
        setModal,
    };
};
