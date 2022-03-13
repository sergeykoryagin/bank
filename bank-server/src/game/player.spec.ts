import { Game } from 'src/game/game';
import { Bank } from 'src/game/bank';
import { Counter } from 'src/game/counter';
import { Player } from 'src/game/player';
import { GameConfig } from 'src/interfaces/configs/game-config';
import { GameOperation } from 'src/interfaces/operations/game-operation';
import { GameOperationType } from 'src/interfaces/operations/game-operation-type.enum';
import { GetCreditOperation } from 'src/interfaces/operations/get-credit-operation';
import { GetMoneyFromBankOperation } from 'src/interfaces/operations/get-money-from-bank-operation';
import { OperationMethod } from 'src/interfaces/operations/operation-method';
import { OperationResult } from 'src/interfaces/operations/operation-result';
import { RepaymentCreditOperation } from 'src/interfaces/operations/repayment-credit-operation';
import { SendMoneyToBankOperation } from 'src/interfaces/operations/send-money-to-bank-operation';
import { SendMoneyToPlayerOperation } from 'src/interfaces/operations/send-money-to-player-operation';
import { TotalPaymentOperation } from 'src/interfaces/operations/total-payment-operation';
import { TotalWriteOffOperation } from 'src/interfaces/operations/total-write-off-operation';
import { GameSettings } from 'src/interfaces/settings/game-settings';
import { User } from 'src/interfaces/user';
import { initialSettings } from 'src/utils/default-settings';
import exp from 'constants';
import { send } from 'process';
import { platform } from 'os';
import { PlayerConfig } from 'src/interfaces/configs/player-config';

describe('Player class', () => {
    it('should be onotialized ', () => {
        const userMoney = 1000;
        const userId = 'userid';
        const userName = 'username';
        const userIndex = 1;
        let playerConfig : PlayerConfig = {
            id : userId,
            username : userName,
            index: userIndex,
            money: userMoney,
        };
        const player =  new Player(playerConfig);
        expect(player).toBeDefined();
        expect(player.money).toEqual(userMoney);
        expect(player.id).toEqual(userId);
        expect(player.username).toEqual(userName);


    });

});