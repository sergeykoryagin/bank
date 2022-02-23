import { VFC } from 'react';
import cn from 'classnames';
import styles from './index.module.sass';

interface Props {
    className?: string;
}

export const Logo: VFC<Props> = ({ className }: Props) => {
    return <span className={cn(styles.logo, className)}>Bankomat Online</span>;
};
