import { useModal } from 'hooks/useModal';
import { FC } from 'react';
import cn from 'classnames';
import styles from './index.module.sass';

interface Props {
    className?: string;
}

export const Modal: FC<Props> = ({ children, className }) => {
    const { closeModal } = useModal();
    return (
        <div className={styles.wrapper}>
            <div className={styles.overlay} onClick={closeModal} />
            <div className={cn(styles.modal, className)}>{children}</div>
        </div>
    );
};
