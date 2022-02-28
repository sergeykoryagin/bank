import cn from 'classnames';
import { BankOperationModal } from 'components/modals/BankOperationModal';
import { useModal } from 'hooks/useModal';
import { Bank } from 'interfaces/bank';
import { VFC } from 'react';
import styles from './index.module.sass';

interface Props {
    bank: Bank;
    className?: string;
}

export const BankComponent: VFC<Props> = ({ className }: Props) => {
    const { setModal } = useModal();
    const handleButtonClick = () => {
        setModal(<BankOperationModal />);
    };

    return (
        <button className={cn(styles.bank, className)} onClick={handleButtonClick} type='button'>
            <div className={styles.circle} />
            <span className={styles.name}>Банк</span>
        </button>
    );
};
