import cn from 'classnames';
import { VFC } from 'react';
import { gameAtom } from 'store/game-atom';
import styles from './index.module.sass';
import { useRecoilValue } from 'recoil';
import { eventsAtom } from 'store/events-atom';

interface Props {
    className?: string;
}

export const EventWindow: VFC<Props> = ({ className }: Props) => {
    const events = useRecoilValue(eventsAtom);
    const game = useRecoilValue(gameAtom);
    return (
        <button className={cn(styles.button, className)}>
            <ul
                className={styles.eventWindow}
                style={{ backgroundColor: game?.settings.backgroundColor }}
            >
                {events.map((event, index) => (
                    <li key={`${event}${index}`} className={styles.event}>
                        {event}
                    </li>
                ))}
            </ul>
        </button>
    );
};
