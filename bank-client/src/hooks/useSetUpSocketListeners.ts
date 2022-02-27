import { BankOperation } from 'interfaces/bank-operation';
import { GameResponse } from 'interfaces/game-response';
import { SendMoneyResponse } from 'interfaces/send-money-response';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Socket } from 'socket.io-client';
import { authAtom } from 'store/auth-atom';
import { eventsAtom } from 'store/events-atom';
import { gameAtom } from 'store/game-atom';
import { playersSelector } from 'store/players-selector';

export const useSetUpSocketListeners = (socket: Socket | null) => {
    const navigate = useNavigate();
    const [lobby, setLobby] = useRecoilState(gameAtom);
    const [auth, setAuth] = useRecoilState(authAtom);
    const players = useRecoilValue(playersSelector);
    const [events, setEvents] = useRecoilState(eventsAtom);

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('createGame', (gameResponse: GameResponse) => {
            setLobby(gameResponse);
            const {
                players: [host],
                id: gameId,
            } = gameResponse;
            localStorage.setItem('myId', host.id);
            setAuth({ ...auth, myId: host.id });
            navigate(`lobby/${gameId}`);
        });

        socket.on('joinGame', (gameResponse: GameResponse) => {
            const { id: gameId } = gameResponse;
            setLobby(gameResponse);
            navigate(`lobby/${gameId}`);
        });

        socket.on('playerConnected', (gameResponse: GameResponse) => {
            setLobby(gameResponse);
        });

        socket.on('startGame', () => {
            if (lobby) {
                setLobby({ ...lobby, isStarted: true });
            }
        });

        socket.on('sendMoney', (sendMoneyResponse: SendMoneyResponse) => {
            if (lobby && players) {
                const newPlayers = players.map((player) => {
                    if (player.id === sendMoneyResponse.sender.id) {
                        return {
                            ...player,
                            money: sendMoneyResponse.sender.money,
                        };
                    }
                    if (player.id === sendMoneyResponse.receiver.id) {
                        return {
                            ...player,
                            money: sendMoneyResponse.receiver.money,
                        };
                    }
                    return player;
                });
                setLobby({ ...lobby, players: newPlayers });
            }
        });
        socket.on('bankOperation', (bankOperation: BankOperation) => {
            if (lobby && players) {
                const newPlayers = players.map((player) => {
                    if (player.id === bankOperation.user.id) {
                        return {
                            ...player,
                            money: bankOperation.user.money,
                        };
                    }
                    return player;
                });
                setLobby({
                    ...lobby,
                    players: newPlayers,
                    bank: { ...lobby.bank, money: bankOperation.bankMoney },
                });
            }
        });

        socket.on('event', (eventText: string) => {
            setEvents([...events, eventText]);
        });
    }, [socket]);
};
