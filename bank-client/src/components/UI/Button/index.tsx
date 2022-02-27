import { FC, MouseEvent } from 'react';
import cn from 'classnames';
import styles from 'components/UI/Button/index.module.sass';

interface Props {
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    title?: string;
}

export const Button: FC<Props> = ({ onClick, children, className, type, disabled, title }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={cn(styles.button, className)}
            disabled={disabled}
            title={title}
        >
            {children}
        </button>
    );
};
