import { WithMoney } from '../interfaces/with-money';
import { getColorByIndex } from '../utils/getColorByIndex';
import { v4 } from 'uuid';

export class Player implements WithMoney {
    money: number;
    id: string;
    color: string;
    username: string;
    constructor(username: string, money: number) {
        this.money = money;
        this.id = v4();
        this.color = getColorByIndex(0);
        this.username = username;
    }
}