import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Socket } from 'socket.io-client';
import { MockPlayer, mockPlayersAtom } from 'store/mock-players-atom';

export const useSetUpSocketListeners = (socket: Socket | null) => {
    const setMockPlayers = useSetRecoilState(mockPlayersAtom);
    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('mockData', (mockData: Array<MockPlayer>) => {
            setMockPlayers(mockData);
        });
    }, [socket]);
};
