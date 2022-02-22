import { io, Socket } from 'socket.io-client';
import { useCallback, useEffect, useState, VFC } from 'react';

const App: VFC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    useEffect(() => {
        const socket = io('http://localhost:3001');
        setSocket(socket);
    }, []);

    const handleButtonClick = useCallback(() => {
        socket?.emit('message', 'kek');
    }, [socket]);

    return (
        <div>
            <span>Лол</span>
            <button onClick={handleButtonClick}>Отправить на сервер сообщение</button>
        </div>
    );
};
export default App;
