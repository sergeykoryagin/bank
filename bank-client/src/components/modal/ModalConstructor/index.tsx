import { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { modalAtom } from 'store/modal-atom';

export const ModalConstructor: VFC = () => {
    return useRecoilValue(modalAtom);
};
