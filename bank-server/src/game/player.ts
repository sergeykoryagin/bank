import { PlayerConfig } from 'src/interfaces/configs/player-config';
import { getColorByIndex } from 'src/utils/getColorByIndex';

export class Player {
    money: number;
    id: string;
    color: string;
    username: string;
    constructor({ username, money, index, id }: PlayerConfig) {
        this.money = money;
        this.username = username;
        this.color = getColorByIndex(index);
        this.id = id;
    }
}
