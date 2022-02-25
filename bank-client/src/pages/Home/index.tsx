import { Button } from 'components/UI/Button';
import { VFC } from 'react';
import { Input } from 'components/UI/Input';
import { Logo } from 'components/UI/Logo';
import { useAuth } from 'hooks/useAuth';
import styles from './index.module.sass';

export const Home: VFC = () => {
    const { name, handleNameChange, handleUsernameSubmit } = useAuth();

    return (
        <div className={styles.home}>
            <Logo className={styles.logo} />
            <h2 className={styles.yourName}>Ваше имя</h2>
            <Input
                value={name}
                onChange={handleNameChange}
                className={styles.input}
                placeholder='Введите имя'
            />
            <Button className={styles.button} onClick={handleUsernameSubmit}>
                Продолжить
            </Button>
        </div>
    );
};
