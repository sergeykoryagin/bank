import { Player } from 'src/game/player';

export type UserWithMoney = Pick<Player, 'money' | 'id'>;
