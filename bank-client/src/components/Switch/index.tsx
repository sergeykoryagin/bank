import { ChangeEvent, VFC } from 'react';
import cn from 'classnames';
import styles from './index.module.sass';

interface Props {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    className?: string;
    disabled?: boolean;
}

export const Switch: VFC<Props> = ({ onChange, className, disabled }: Props) => {
    return (
        <label className={cn(styles.switch, className)}>
            <div className={styles.slider} />
            <input
                onChange={onChange}
                className={styles.input}
                disabled={disabled}
                type='checkbox'
            />
        </label>
    );
};
