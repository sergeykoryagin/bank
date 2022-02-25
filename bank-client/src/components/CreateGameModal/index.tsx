import { Switch } from 'components/UI/Switch';
import { useFormik } from 'formik';
import { VFC } from 'react';
import { Button } from 'components/UI/Button';
import { useModal } from 'hooks/useModal';
import { useSocket } from 'hooks/useSocket';
import { Modal } from 'components/modal/Modal';
import styles from './index.module.sass';

const initialSettings = {
    gaymode: false,
    ordered: false,
};

export const CreateGameModal: VFC = () => {
    const { closeModal } = useModal();
    const socket = useSocket();
    const handleCreateGameClick = (values: typeof initialSettings) => {
        console.log(values);
        socket?.emit('createGame', { hostName: '', ...values });
    };
    const { handleSubmit, handleChange, values } = useFormik({
        onSubmit: handleCreateGameClick,
        initialValues: initialSettings,
    });

    return (
        <Modal className={styles.modal}>
            <h2 className={styles.title}>Создание игры</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.fields}>
                    <label className={styles.field}>
                        <Switch
                            name='gaymode'
                            onChange={handleChange}
                            checked={values.gaymode}
                            className={styles.switch}
                        />
                        <span>Включить gaymode</span>
                    </label>
                    <label className={styles.field}>
                        <Switch
                            name='ordered'
                            onChange={handleChange}
                            checked={values.ordered}
                            className={styles.switch}
                        />
                        <span>Включить очередь gaymode</span>
                    </label>
                </div>

                <Button className={styles.createButton} type='submit'>
                    Создать
                </Button>
                <Button onClick={closeModal} type='button'>
                    Отмена
                </Button>
            </form>
        </Modal>
    );
};
