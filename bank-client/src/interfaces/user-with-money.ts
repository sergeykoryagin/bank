import { Player } from 'interfaces/player';

export type UserWithMoney = Pick<Player, 'money' | 'id'>;
