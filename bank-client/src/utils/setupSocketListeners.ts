import { GameResponse } from 'interfaces/game-response';
import { OperationResult } from 'interfaces/operations/results/operation-result';
import { Player } from 'interfaces/player';
import { NavigateFunction } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { getRecoil, setRecoil } from 'recoil-nexus';
import { authAtom } from 'store/auth-atom';
import { eventsAtom } from 'store/events-atom';
import { gameAtom } from 'store/game-atom';
import { playersSelector } from 'store/players-selector';
import { getOperationByType } from 'utils/operations/get-operation-by-type';

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

    socket.on('joinGame', (gameResponse: GameResponse, myId: string) => {
        const auth = getRecoil(authAtom);
        setRecoil(gameAtom, gameResponse);
        localStorage.setItem('myId', myId);
        setRecoil(authAtom, { ...auth, myId: myId });
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

    socket.on(
        'playerReconnected',
        (reconnectedPlayer: Player & { oldId: string }, hostId?: string) => {
            const game = getRecoil(gameAtom);
            if (game) {
                const newPlayers = game.players.map((player) => {
                    if (player.id === reconnectedPlayer.oldId) {
                        const { oldId, ...newPlayer } = reconnectedPlayer;
                        return newPlayer;
                    }
                    return player;
                });
                setRecoil(gameAtom, { ...game, players: newPlayers });
                hostId && setRecoil(gameAtom, { ...game, hostId });
            }
        },
    );

    socket.on('startGame', () => {
        const lobby = getRecoil(gameAtom);
        if (lobby) {
            setRecoil(gameAtom, { ...lobby, isStarted: true });
        }
    });

    socket.on('operation', (operationResult: OperationResult) => {
        if (operationResult.success) {
            const operationMethod = getOperationByType(operationResult.type);
            operationMethod(operationResult);
        }
        const events = getRecoil(eventsAtom);
        setRecoil(eventsAtom, [operationResult.message, ...events]);
    });
};
