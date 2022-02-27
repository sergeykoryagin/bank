import { Input } from 'components/UI/Input';
import { useSocket } from 'hooks/useSocket';
import { Player } from 'interfaces/player';
import { ChangeEvent, useState, VFC } from 'react';
import { Button } from 'components/UI/Button';
import { useModal } from 'hooks/useModal';
import { Modal } from 'components/modal/Modal';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'store/auth-atom';
import { myPlayerSelector } from 'store/my-player-selector';
import styles from './index.module.sass';

interface Props {
    player: Player;
}

export const SendMoneyModal: VFC<Props> = ({ player }: Props) => {
    const { closeModal } = useModal();
    const { myId } = useRecoilValue(authAtom);
    const myPlayer = useRecoilValue(myPlayerSelector);
    const socket = useSocket();
    const [money, setMoney] = useState('');
    const [error, setError] = useState('');

    const handleSendMoney = () => {
        if (!error) {
            socket?.emit('sendMoney', { receiverId: player.id, money: +money, senderId: myId });
        }
    };

    const handleMoneyChange = (event: ChangeEvent<HTMLInputElement>) => {
        const money = event.target.value;
        if (+money > Number(myPlayer?.money)) {
            setError('У вас нет столько денег!');
        } else {
            setError('');
        }
        setMoney(money);
    };

    return (
        <Modal
            className={styles.modal}
            modalStyle={{ background: `linear-gradient(135deg, ${player.color} 0%, #C1C8D6 100%)` }}
        >
            <h2 className={styles.title}>{player.username}</h2>
            <div className={styles.form}>
                <Input
                    value={money}
                    onChange={handleMoneyChange}
                    className={styles.input}
                    placeholder='Введите сумму'
                    type='number'
                    hasError={!!error}
                />
                <div className={styles.buttons}>
                    <Button
                        className={styles.sendButton}
                        onClick={handleSendMoney}
                        type='button'
                        disabled={!!error}
                    >
                        Перевести
                    </Button>
                    <Button onClick={closeModal} type='button' className={styles.cancelButton}>
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
