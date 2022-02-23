import { ChangeEvent, VFC } from 'react';
import cn from 'classnames';
import styles from './index.module.sass';

interface Props {
    className?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
}

export const Input: VFC<Props> = ({ className, value, onChange, placeholder, disabled }: Props) => {
    return (
        <input
            className={cn(styles.input, className)}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
};
