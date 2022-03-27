import { BackButton } from 'components/UI/BackButton';
import { Button } from 'components/UI/Button';
import { useSocket } from 'hooks/useSocket';
import { useEffect, VFC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { gameAtom } from 'store/game-atom';
import { ReactComponent as CopyIcon } from 'assets/svg/copy.svg';
import { hostSelector } from 'store/host-selector';
import { copyTextToClipBoard } from 'utils/copy-text-to-clip-board';
import styles from './index.module.sass';

type LocationParams = {
    gameId: string;
};

export const Lobby: VFC = () => {
    const { gameId } = useParams<LocationParams>();
    const game = useRecoilValue(gameAtom);
    const socket = useSocket();
    const hostRights = useRecoilValue(hostSelector);
    const navigate = useNavigate();

    useEffect(() => {
        game?.isStarted && navigate(`/game/${game.id}`);
    }, [game, gameId]);

    const handleCopyCodeClick = () => {
        copyTextToClipBoard(`${gameId}`);
    };

    const handleStartClick = () => {
        socket?.emit('startGame', gameId);
    };

    return (
        <div className={styles.lobby}>
            <div className={styles.header}>
                <BackButton className={styles.backButton} href='/menu' />
                <h2 className={styles.title}>
                    Ожидание
                    <br />
                    игроков
                </h2>
            </div>
            <span className={styles.count}>
                {game?.players.length} / {game?.settings.maxPlayers}
            </span>
            {game?.settings.order.hasOrder || 1 < 2 ? (
                <div className={styles.players}>
                    {game?.players.map((player) => (
                        <div key={player.id} className={styles.player}>
                            {player.username}
                        </div>
                    ))}
                </div>
            ) : (
                <ul className={styles.players}>
                    {game?.players.map((player) => (
                        <li key={player.id} className={styles.player}>
                            {player.username}
                        </li>
                    ))}
                </ul>
            )}
            <div className={styles.buttons}>
                {hostRights && (
                    <Button className={styles.startButton} type='button' onClick={handleStartClick}>
                        Начать
                    </Button>
                )}
                <Button
                    className={styles.copyCodeButton}
                    onClick={handleCopyCodeClick}
                    title='Скопировать код'
                >
                    <CopyIcon className={styles.copyCodeIcon} />
                </Button>
            </div>
        </div>
    );
};
