import { useModal } from 'hooks/useModal';
import { CSSProperties, FC } from 'react';
import cn from 'classnames';
import ReactDOM from 'react-dom';
import styles from 'components/modals/modal/Modal/index.module.sass';

interface Props {
    className?: string;
    modalStyle?: CSSProperties;
}

export const Modal: FC<Props> = ({ children, className, modalStyle }) => {
    const { closeModal } = useModal();

    return ReactDOM.createPortal(
        <div className={styles.wrapper}>
            <div className={styles.overlay} onClick={closeModal} />
            <div className={cn(styles.modal, className)} style={modalStyle}>
                {children}
            </div>
        </div>,
        document.getElementById('modal') as HTMLElement,
    );
};
