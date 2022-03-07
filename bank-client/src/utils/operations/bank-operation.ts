import { BankOperationResult } from 'interfaces/operations/results/bank-operation-result';
import { getRecoil, setRecoil } from 'recoil-nexus';
import { gameAtom } from 'store/game-atom';

export const bankOperation = ({ data: { bankMoney, user } }: BankOperationResult): void => {
    const game = getRecoil(gameAtom);
    if (game) {
        const newPlayers = game.players.map((player) => {
            if (player.id === user.id) {
                return {
                    ...player,
                    money: user.money,
                };
            }
            return player;
        });
        setRecoil(gameAtom, {
            ...game,
            players: newPlayers,
            bank: { ...game.bank, money: bankMoney },
        });
    }
};
