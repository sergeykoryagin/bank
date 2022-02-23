import { useModal } from 'hooks/useModal';
import { useEffect, VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { modalAtom } from 'store/modal-atom';

export const ModalConstructor: VFC = () => {
    const { closeModal } = useModal();
    useEffect(() => () => closeModal(), []);
    return useRecoilValue(modalAtom);
};
