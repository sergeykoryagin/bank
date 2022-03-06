import { BackButton } from 'components/UI/BackButton';
import { ModalConstructor } from 'components/modals/modal/ModalConstructor';
import { SendMoneyModal } from 'components/modals/SendMoneyModal';
import { BankComponent } from 'components/UI/BankComponent';
import { EventWindow } from 'components/UI/EventWindow';
import { PlayerComponent } from 'components/UI/PlayerComponent';
import { useModal } from 'hooks/useModal';
import { Player } from 'interfaces/player';
import { VFC } from 'react';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'store/auth-atom';
import { gameAtom } from 'store/game-atom';
import { playersSelector } from 'store/players-selector';
import styles from './index.module.sass';

export const Game: VFC = () => {
    const { myId } = useRecoilValue(authAtom);
    const game = useRecoilValue(gameAtom);
    const players = useRecoilValue(playersSelector);
    const { setModal } = useModal();

    const handlePlayerClick = (player: Player) => {
        if (player.id !== myId) {
            setModal(<SendMoneyModal player={player} />);
        }
    };

    return (
        <div className={styles.game}>
            <div className={styles.topWrapper}>
                <BackButton className={styles.backButton} to='/menu' />
                {game?.bank && <BankComponent bank={game.bank} className={styles.bank} />}
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
            <EventWindow className={styles.eventWindow} />
            <ModalConstructor />
        </div>
    );
};
