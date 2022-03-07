import { SendMoneyToPlayerResult } from 'interfaces/operations/results/send-money-to-player-result';
import { getRecoil, setRecoil } from 'recoil-nexus';
import { gameAtom } from 'store/game-atom';

export const sendMoneyToPlayer = ({
    data: { sender, receiver },
}: SendMoneyToPlayerResult): void => {
    const game = getRecoil(gameAtom);
    if (game) {
        const newPlayers = game.players.map((player) => {
            if (player.id === receiver.id) {
                return {
                    ...player,
                    money: receiver.money,
                };
            }
            if (player.id === sender.id) {
                return {
                    ...player,
                    money: sender.money,
                };
            }
            return player;
        });
        setRecoil(gameAtom, { ...game, players: newPlayers });
    }
};
