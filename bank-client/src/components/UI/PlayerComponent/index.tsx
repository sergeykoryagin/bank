import { Player } from 'interfaces/player';
import { VFC } from 'react';
import styles from './index.module.sass';

interface Props {
    player: Player;
    onClick?: () => void;
}

export const PlayerComponent: VFC<Props> = ({ player, onClick }: Props) => {
    return (
        <button className={styles.player} onClick={onClick}>
            <div
                className={styles.circle}
                style={{
                    background: `linear-gradient(136.24deg, #FFFFFF -15.11%, ${player.color} 85.88%)`,
                }}
            />
            <span className={styles.name}>{player.username}</span>
        </button>
    );
};
