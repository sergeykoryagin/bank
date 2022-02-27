import { ChangeEvent, VFC } from 'react';
import cn from 'classnames';
import styles from 'components/UI/Input/index.module.sass';

interface Props {
    className?: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    hasError?: boolean;
    name?: string;
    type?: 'number';
}

export const Input: VFC<Props> = ({
    className,
    value,
    onChange,
    placeholder,
    disabled,
    hasError,
    name,
    type,
}: Props) => {
    return (
        <input
            className={cn(styles.input, className, {
                [styles.inputError]: hasError,
            })}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            type={type}
        />
    );
};
