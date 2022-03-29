import { ChangeEvent, VFC } from 'react';
import cn from 'classnames';
import styles from 'components/UI/Input/index.module.sass';
import InputMask from 'react-input-mask';

interface Props {
    className?: string;
    value?: string | number;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    hasError?: boolean;
    name?: string;
    type?: 'number' | 'text';
    autoFocus?: boolean;
    mask?: string;
}

export const Input: VFC<Props> = ({
    className,
    value,
    onChange,
    placeholder,
    disabled,
    hasError,
    name,
    autoFocus,
    mask,
}: Props) => {
    return (
        <InputMask
            alwaysShowMask={false}
            mask={mask || ''}
            className={cn(styles.input, className, {
                [styles.inputError]: hasError,
            })}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            autoFocus={autoFocus}
        />
    );
};
