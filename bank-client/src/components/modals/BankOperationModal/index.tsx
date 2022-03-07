import { Input } from 'components/UI/Input';
import { useSocket } from 'hooks/useSocket';
import { GameOperationType } from 'interfaces/operations/game-operation-type.enum';
import { ChangeEvent, useState, VFC } from 'react';
import { Button } from 'components/UI/Button';
import { useModal } from 'hooks/useModal';
import { Modal } from 'components/modals/modal/Modal';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'store/auth-atom';
import { gameAtom } from 'store/game-atom';
import { myPlayerSelector } from 'store/my-player-selector';
import styles from 'components/modals/BankOperationModal/index.module.sass';

export const BankOperationModal: VFC = () => {
    const { closeModal } = useModal();
    const [money, setMoney] = useState('');
    const [error, setError] = useState('');
    const myPlayer = useRecoilValue(myPlayerSelector);
    const game = useRecoilValue(gameAtom);
    const { myId } = useRecoilValue(authAtom);
    const socket = useSocket();

    const handleSendMoney = () => {
        if (+money > Number(myPlayer?.money)) {
            setError('У вас нет столько денег!');
        } else if (!isNaN(+money)) {
            socket?.emit('operation', {
                gameId: game?.id,
                operation: {
                    type: GameOperationType.SEND_MONEY_TO_BANK,
                    playerId: myId,
                    money: +money,
                },
            });
            closeModal();
        } else {
            setError('Введите корректное число!');
        }
    };

    const handleGetMoney = () => {
        if (!isNaN(+money)) {
            socket?.emit('operation', {
                gameId: game?.id,
                operation: {
                    type: GameOperationType.GET_MONEY_FROM_BANK,
                    playerId: myId,
                    money: +money,
                },
            });
            closeModal();
        } else {
            setError('Введите корректное число!');
        }
    };

    const handleMoneyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMoney(event.target.value);
        setError('');
    };

    return (
        <Modal
            className={styles.modal}
            modalStyle={{ background: 'linear-gradient(135deg, #0038FF 0%, #C1C8D6 100%)' }}
        >
            <h2 className={styles.title}>Банк</h2>
            <div className={styles.form}>
                <Input
                    value={money}
                    onChange={handleMoneyChange}
                    className={styles.input}
                    placeholder='Введите сумму'
                    type='number'
                    hasError={!!error}
                    autoFocus
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
                    <Button className={styles.getButton} onClick={handleGetMoney} type='button'>
                        Получить
                    </Button>
                    <Button onClick={closeModal} type='button' className={styles.cancelButton}>
                        Отмена
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
