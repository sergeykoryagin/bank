import { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from 'store/modal-atom';
import cn from 'classnames';
import styles from './index.module.sass';

interface Props {
    className?: string;
}

export const Modal: FC<Props> = ({ children, className }) => {
    const setModal = useSetRecoilState(modalAtom);
    const handleCloseModal = () => {
        setModal(null);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.overlay} onClick={handleCloseModal} />
            <div className={cn(styles.modal, className)}>{children}</div>
        </div>
    );
};
