import { Button } from 'components/UI/Button';
import { useEffect, useMemo, VFC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'store/auth-atom';
import { gameAtom } from 'store/game-atom';
import { ReactComponent as CopyIcon } from 'assets/svg/copy.svg';
import styles from './index.module.sass';

type LocationParams = {
    gameId: string;
};

export const Lobby: VFC = () => {
    const { gameId } = useParams<LocationParams>();
    const game = useRecoilValue(gameAtom);
    const { myId } = useRecoilValue(authAtom);
    const navigate = useNavigate();

    const hostRights = useMemo(() => {
        return myId === game?.players?.[0]?.id;
    }, [game, myId]);

    useEffect(() => {
        game?.isStarted && navigate(`game/${game.id}`);
    }, [game, gameId]);

    const handleCopyCodeClick = () => {
        navigator.clipboard.writeText(gameId || '');
    };

    const handleStartClick = () => {
        console.log('game is started...');
    };

    return (
        <div className={styles.lobby}>
            <h2 className={styles.title}>
                Ожидание
                <br />
                игроков
            </h2>
            <span className={styles.count}>{game?.players.length} / 8</span>
            <ul className={styles.players}>
                {game?.players.map((player) => (
                    <li key={player.id} className={styles.player}>
                        {player.username}
                    </li>
                ))}
            </ul>
            <div className={styles.buttons}>
                {hostRights && (
                    <Button className={styles.startButton} type='button' onClick={handleStartClick}>
                        Начать
                    </Button>
                )}
                <Button className={styles.copyCodeButton} onClick={handleCopyCodeClick}>
                    <CopyIcon className={styles.copyCodeIcon} />
                </Button>
            </div>
        </div>
    );
};
