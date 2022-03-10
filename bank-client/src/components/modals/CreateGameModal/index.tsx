import { initialSettings } from 'components/modals/CreateGameModal/utils/initial-settings';
import { Input } from 'components/UI/Input';
import { Switch } from 'components/UI/Switch';
import { useFormik } from 'formik';
import { GameSettings } from 'interfaces/settings/game-settings';
import { useCallback, VFC } from 'react';
import { Button } from 'components/UI/Button';
import { useModal } from 'hooks/useModal';
import { useSocket } from 'hooks/useSocket';
import { Modal } from 'components/modals/modal/Modal';
import { useRecoilValue } from 'recoil';
import { authAtom } from 'store/auth-atom';
import styles from 'components/modals/CreateGameModal/index.module.sass';

export const CreateGameModal: VFC = () => {
    const { closeModal } = useModal();
    const { username } = useRecoilValue(authAtom);
    const socket = useSocket();

    const onSubmit = useCallback(
        (settings: GameSettings) => {
            socket?.emit('createGame', { hostname: username, settings });
        },
        [username, socket],
    );

    const { handleSubmit, values, handleChange } = useFormik<GameSettings>({
        initialValues: initialSettings,
        onSubmit,
    });

    return (
        <Modal className={styles.modal}>
            <h2 className={styles.title}>Создание игры</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.fields}>
                    <label className={styles.field}>
                        <Input
                            name='startMoney'
                            value={values.startMoney}
                            placeholder='Деньги'
                            onChange={handleChange}
                            type='number'
                            className={styles.input}
                        />
                        <div>Стартовые деньги</div>
                    </label>
                    <label className={styles.field}>
                        <Input
                            name='bank.startMoney'
                            value={values.bank.startMoney}
                            placeholder='Банк'
                            onChange={handleChange}
                            type='number'
                            className={styles.input}
                        />
                        <div>Стартовые деньги в банке</div>
                    </label>
                    <label className={styles.field}>
                        <Input
                            name='maxPlayers'
                            value={values.maxPlayers}
                            placeholder='Игроки'
                            onChange={handleChange}
                            type='number'
                            className={styles.input}
                        />
                        <div>Максимальное число игроков</div>
                    </label>
                    <label className={styles.field}>
                        <Switch
                            name='faceControl'
                            checked={values.faceControl}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <div>Фейс контроль</div>
                    </label>
                    {/* TODO: внутриигровые кубики https://rosrit.atlassian.net/browse/KEK-60 */}
                    {/*<label className={styles.field}>*/}
                    {/*    <Switch*/}
                    {/*        name='hasDice'*/}
                    {/*        checked={values.hasDice}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        className={styles.input}*/}
                    {/*        disabled*/}
                    {/*    />*/}
                    {/*    <div>Внутриигровые кубики</div>*/}
                    {/*</label>*/}
                    <label className={styles.field}>
                        <Switch
                            name='hasUndoRedo'
                            checked={values.hasUndoRedo}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <div>Возврат хода</div>
                    </label>
                    {/* TODO: Создать задачку для реализации запроса денег у другого игрока */}
                    {/*<label className={styles.field}>*/}
                    {/*    <Switch*/}
                    {/*        name='hasMoneyRequests'*/}
                    {/*        checked={values.hasMoneyRequests}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        className={styles.input}*/}
                    {/*        disabled*/}
                    {/*    />*/}
                    {/*    <div>Запрос денег</div>*/}
                    {/*</label>*/}
                    {/* TODO: Добавить очередь https://rosrit.atlassian.net/browse/KEK-52 */}
                    {/*<label className={styles.field}>*/}
                    {/*    <Switch*/}
                    {/*        name='order.hasOrder'*/}
                    {/*        checked={values.order.hasOrder}*/}
                    {/*        onChange={handleChange}*/}
                    {/*        className={styles.input}*/}
                    {/*    />*/}
                    {/*    <div>Очередь игроков</div>*/}
                    {/*</label>*/}
                    {values.order.hasOrder && (
                        <>
                            <label className={styles.field}>
                                <Switch
                                    name='order.timer.hasTimer'
                                    checked={values.order.timer.hasTimer}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                <div>Время на ход</div>
                            </label>
                            {values.order.timer.hasTimer && (
                                <label className={styles.field}>
                                    <Input
                                        name='order.timer.secondsToMove'
                                        value={values.order.timer.secondsToMove}
                                        placeholder='Секунды'
                                        onChange={handleChange}
                                        type='number'
                                        className={styles.input}
                                    />
                                    <div>Секунд на ход</div>
                                </label>
                            )}
                            <label className={styles.field}>
                                <Switch
                                    name='order.credit.hasCredits'
                                    checked={values.order.credit.hasCredits}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                <div>Займы в банке</div>
                            </label>
                            {values.order.credit.hasCredits && (
                                <>
                                    <label className={styles.field}>
                                        <Input
                                            name='order.credit.movesCount'
                                            value={values.order.credit.movesCount}
                                            placeholder='Число ходов'
                                            onChange={handleChange}
                                            type='number'
                                            className={styles.input}
                                        />
                                        <div>Ходов до погашения кредита</div>
                                    </label>
                                    <label className={styles.field}>
                                        <Input
                                            name='order.credit.rate'
                                            value={values.order.credit.rate}
                                            placeholder='Ставка'
                                            onChange={handleChange}
                                            type='number'
                                            className={styles.input}
                                        />
                                        <div>Процентная ставка</div>
                                    </label>
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className={styles.buttons}>
                    <Button className={styles.createButton} type='submit'>
                        Создать
                    </Button>
                    <Button onClick={closeModal} type='button'>
                        Отмена
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
