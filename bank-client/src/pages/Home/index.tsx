import { useAuth } from 'hooks/useAuth';
import { VFC } from 'react';

export const Home: VFC = () => {
    const { name, handleNameChange, handleUsernameSubmit } = useAuth();
    return (
        <div>
            <h2>Введите ваше имя</h2>
            <input value={name} onChange={handleNameChange} />
            <button onClick={handleUsernameSubmit} type='button'>
                Продолжить
            </button>
        </div>
    );
};
