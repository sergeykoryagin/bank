import cn from 'classnames';
import { Button } from 'components/UI/Button';
import { ReactNode, VFC } from 'react';
import styles from './index.module.sass';

interface Props {
    className?: string;
    icon: ReactNode;
    onClick?: () => void;
    text: string;
}

export const SmallButton: VFC<Props> = ({ className, icon, onClick, text }: Props) => {
    return (
        <Button onClick={onClick} className={cn(styles.smallButton, className)}>
            {icon}
            <span>{text}</span>
        </Button>
    );
};
