import { BackButton } from 'components/BackButton';
import { ModalConstructor } from 'components/modal/ModalConstructor';
import { SendMoneyModal } from 'components/SendMoneyModal';
import { BankComponent } from 'components/UI/BankComponent';
import { PlayerComponent } from 'components/UI/PlayerComponent';
import { useModal } from 'hooks/useModal';
import { Bank } from 'interfaces/bank';
import { Player } from 'interfaces/player';
import { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'store/auth-atom';
import styles from './index.module.sass';

const players: Array<Player> = [
    {
        id: '1231',
        username: 'serega',
        color: '#E20000',
        money: 16000,
    },
    {
        id: '12321',
        username: 'antoha',
        color: '#00FFE0',
        money: 16000,
    },
    {
        id: '132',
        username: 'timur',
        color: '#A400DE',
        money: 16000,
    },
    {
        id: '13n2',
        username: 'vasya',
        color: '#F59421',
        money: 16000,
    },
    {
        id: '13n25',
        username: 'ilsiyar',
        color: '#00FF66',
        money: 16000,
    },
];

const bank: Bank = {
    money: 16000,
};

export const Game: VFC = () => {
    const { myId } = useRecoilValue(authAtom);
    const { setModal } = useModal();

    const handlePlayerClick = (player: Player) => {
        if (player.id !== myId) {
            setModal(<SendMoneyModal player={player} />);
        }
    };

    return (
        <div className={styles.game}>
            <div className={styles.wrapper}>
                <BackButton className={styles.backButton} to='/menu' />
                {bank && <BankComponent bank={bank} className={styles.bank} />}
            </div>
            <ul className={styles.players}>
                {players?.map((player) => (
                    <li key={player.id} className={styles.player}>
                        <PlayerComponent
                            player={player}
                            onClick={() => handlePlayerClick(player)}
                        />
                    </li>
                ))}
            </ul>
            <ModalConstructor />
        </div>
    );
};
