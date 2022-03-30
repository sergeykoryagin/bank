import { BackButton } from 'components/UI/BackButton';
import { ModalConstructor } from 'components/modals/modal/ModalConstructor';
import { SendMoneyModal } from 'components/modals/SendMoneyModal';
import { BankComponent } from 'components/UI/BankComponent';
import { EventWindow } from 'components/UI/EventWindow';
import { PlayerComponent } from 'components/UI/PlayerComponent';
import { SmallButton } from 'components/UI/SmallButton';
import { useModal } from 'hooks/useModal';
import { useSocket } from 'hooks/useSocket';
import { Player } from 'interfaces/player';
import { useEffect, VFC } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { authAtom } from 'store/auth-atom';
import { eventsAtom } from 'store/events-atom';
import { gameAtom } from 'store/game-atom';
import { hostSelector } from 'store/host-selector';
import { playersSelector } from 'store/players-selector';
import { ReactComponent as UndoIcon } from 'assets/svg/undo.svg';
import { ReactComponent as RedoIcon } from 'assets/svg/redo.svg';
import styles from './index.module.sass';

export const Game: VFC = () => {
    const { myId } = useRecoilValue(authAtom);
    const [game, setGame] = useRecoilState(gameAtom);
    const setEvents = useSetRecoilState(eventsAtom);
    const players = useRecoilValue(playersSelector);
    const hostRights = useRecoilValue(hostSelector);
    const { setModal } = useModal();
    const socket = useSocket();

    const handlePlayerClick = (player: Player) => {
        if (player.id !== myId) {
            setModal(<SendMoneyModal player={player} />);
        }
    };

    const handleUndo = () => {
        socket?.emit('undo', game?.id);
    };

    const handleRedo = () => {
        socket?.emit('redo', game?.id);
    };

    useEffect(
        () => () => {
            setGame(null);
            setEvents([]);
        },
        [],
    );

    return (
        <div className={styles.game} style={{ backgroundColor: game?.settings.backgroundColor }}>
            <div className={styles.topWrapper}>
                <BackButton className={styles.backButton} href='/menu' />
                {game?.bank && <BankComponent bank={game.bank} className={styles.bank} />}
            </div>
            <ul className={styles.players}>
                {players?.map((player) => (
                    <li key={player.id} className={styles.player}>
                        <PlayerComponent
                            player={player}
                            onClick={() => handlePlayerClick(player)}
                            faceControl={game?.settings.faceControl}
                        />
                    </li>
                ))}
            </ul>
            {hostRights && game?.settings.hasUndoRedo && (
                <div className={styles.undoRedo}>
                    <SmallButton text='Undo' icon={<UndoIcon />} onClick={handleUndo} />
                    <SmallButton text='Redo' icon={<RedoIcon />} onClick={handleRedo} />
                </div>
            )}
            <EventWindow className={styles.eventWindow} />
            <ModalConstructor />
        </div>
    );
};
