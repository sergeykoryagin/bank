import { createContext, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { setupSocketListeners } from 'utils/setup-socket-listeners';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: FC = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const socket: Socket = io('http://10.17.32.25:8080', {
            transports: ['websocket'],
        });
        setSocket(socket);
        setupSocketListeners(socket, navigate);
    }, []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
