import { useSetUpSocketListeners } from 'hooks/useSetUpSocketListeners';
import { createContext, FC, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: FC = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socket = io('http://192.168.0.103:80', { transports: ['websocket'] });
        setSocket(socket);
    }, []);

    useSetUpSocketListeners(socket);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
