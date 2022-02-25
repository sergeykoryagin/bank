import { ChangeEvent, VFC } from 'react';
import cn from 'classnames';
import styles from 'components/UI/Switch/index.module.sass';

interface Props {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    className?: string;
    disabled?: boolean;
    name?: string;
}

export const Switch: VFC<Props> = ({ onChange, className, disabled, checked, name }: Props) => {
    return (
        <label
            className={cn(styles.switch, className, {
                [styles.switchChecked]: checked,
            })}
        >
            <div
                className={styles.slider}
                style={{ transform: `translateX(${checked ? '24px' : '0px'})` }}
            />
            <input
                name={name}
                onChange={onChange}
                className={styles.input}
                disabled={disabled}
                type='checkbox'
            />
        </label>
    );
};
