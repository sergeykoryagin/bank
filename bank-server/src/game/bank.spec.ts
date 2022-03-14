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
import { Credit } from 'src/interfaces/credit';
import { BankSettings } from 'src/interfaces/settings/bank-settings';
import { BankConfig } from 'src/interfaces/configs/bank-config';


describe('Bank class', () => {

        it('should be initialized with credits', () => {
        const userMoney = 1000;
        const hascredits =  true;
        let bankConfig : BankConfig = {
            startMoney : userMoney,
            hasCredits: hascredits
        }
        let credits = new Map<string, Credit>();
        const bank =  new Bank(bankConfig );
        expect(bank).toBeDefined();
        expect(bank.money).toEqual(userMoney);
        expect(bank.credits).toEqual(credits);
    });



    it('should be initialized without credits', () => {
        const userMoney = 1000;
        const userMovesLef = 5;
        const playerId = 'hostId';
        const hascredits =  false;
        let usercredit : Credit =
        {
            money: userMoney,
            movesLeft: userMovesLef,
            playerId : playerId

        }
        let bankConfig : BankConfig = {
            startMoney : userMoney,
            hasCredits: hascredits
        }
        const bank =  new Bank(bankConfig );
        expect(bank).toBeDefined();
        expect(bank.money).toEqual(userMoney);
        expect(bank.credits).toBeUndefined();
    });
});