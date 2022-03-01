import { createContext, FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { setupSocketListeners } from 'utils/setupSocketListeners';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: FC = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io('http://192.168.0.103:80', { transports: ['websocket'] });
        setSocket(socket);
        setupSocketListeners(socket, navigate);
    }, []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
