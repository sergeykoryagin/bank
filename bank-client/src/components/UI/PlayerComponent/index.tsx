import { useTieColor } from 'components/UI/PlayerComponent/hooks/use-tie-color';
import { Player } from 'interfaces/player';
import { VFC } from 'react';
import { ReactComponent as TieIcon } from 'assets/svg/tie.svg';
import styles from './index.module.sass';

interface Props {
    player: Player;
    faceControl?: boolean;
    onClick?: () => void;
}

export const PlayerComponent: VFC<Props> = ({ player, onClick, faceControl = false }: Props) => {
    const tieRef = useTieColor(player.color);
    return (
        <button className={styles.player} onClick={onClick}>
            <div
                className={styles.circle}
                style={{
                    background: `linear-gradient(136.24deg, #FFFFFF -15.11%, ${player.color} 85.88%)`,
                }}
            >
                {faceControl && (
                    <TieIcon
                        ref={tieRef}
                        className={styles.tie}
                        style={{ stopColor: player.color }}
                    />
                )}
            </div>
            <span className={styles.name}>{player.username}</span>
            <span className={styles.money}>{player.money}</span>
        </button>
    );
};
