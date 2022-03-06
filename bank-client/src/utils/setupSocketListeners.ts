import { BankOperationResponse } from 'interfaces/bank-operation-response';
import { GameResponse } from 'interfaces/game-response';
import { Player } from 'interfaces/player';
import { SendMoneyResponse } from 'interfaces/send-money-response';
import { NavigateFunction } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { getRecoil, setRecoil } from 'recoil-nexus';
import { authAtom } from 'store/auth-atom';
import { eventsAtom } from 'store/events-atom';
import { gameAtom } from 'store/game-atom';
import { playersSelector } from 'store/players-selector';

export const setupSocketListeners = (socket: Socket, navigate: NavigateFunction) => {
    socket.on('createGame', (gameResponse: GameResponse) => {
        const auth = getRecoil(authAtom);
        setRecoil(gameAtom, gameResponse);
        const {
            players: [host],
            id: gameId,
        } = gameResponse;
        localStorage.setItem('myId', host.id);
        setRecoil(authAtom, { ...auth, myId: host.id });
        navigate(`lobby/${gameId}`);
    });

    socket.on('joinGame', (gameResponse: GameResponse) => {
        const auth = getRecoil(authAtom);
        setRecoil(gameAtom, gameResponse);
        const playersCount = gameResponse.players.length;
        const id = `${gameResponse.players[playersCount - 1]?.id}`;
        localStorage.setItem('myId', id);
        setRecoil(authAtom, { ...auth, myId: id });
        navigate(`lobby/${gameResponse.id}`);
    });

    socket.on('playerConnected', (player: Player) => {
        const players = getRecoil(playersSelector);
        const lobby = getRecoil(gameAtom);
        if (players && lobby) {
            const newPlayers = [...players, player];
            setRecoil(gameAtom, { ...lobby, players: newPlayers });
        }
    });

    socket.on('startGame', () => {
        const lobby = getRecoil(gameAtom);
        if (lobby) {
            setRecoil(gameAtom, { ...lobby, isStarted: true });
        }
    });

    socket.on('transaction', (sendMoneyResponse: SendMoneyResponse) => {
        const lobby = getRecoil(gameAtom);
        const players = getRecoil(playersSelector);
        const events = getRecoil(eventsAtom);
        if (lobby && players && sendMoneyResponse) {
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
            setRecoil(gameAtom, { ...lobby, players: newPlayers });
            setRecoil(eventsAtom, [sendMoneyResponse.message, ...events]);
        }
    });
    socket.on('bankOperation', (bankOperation: BankOperationResponse) => {
        const lobby = getRecoil(gameAtom);
        const players = getRecoil(playersSelector);
        const events = getRecoil(eventsAtom);
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
            setRecoil(gameAtom, {
                ...lobby,
                players: newPlayers,
                bank: { ...lobby.bank, money: bankOperation.bankMoney },
            });
            setRecoil(eventsAtom, [bankOperation.message, ...events]);
        }
    });
};
