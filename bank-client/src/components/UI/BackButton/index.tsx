import { ReactComponent as ArrowBack } from 'assets/svg/arrow-back.svg';
import cn from 'classnames';
import styles from 'components/UI/BackButton/index.module.sass';
import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    className?: string;
    href: string;
}

export const BackButton: VFC<Props> = ({ className, href }: Props) => {
    const navigate = useNavigate();
    const handleBackClick = () => navigate(href);
    return (
        <button className={cn(styles.backButton, className)} onClick={handleBackClick}>
            <ArrowBack className={styles.backIcon} />
        </button>
    );
};
