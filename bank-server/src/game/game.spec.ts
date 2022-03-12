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

describe('Game class', () => {
    it('should be initialized', () => {
        
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: initialSettings,
        });
        expect(game).toBeDefined();
    });
});


describe('Game class', () => {
    it('should return right player', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: initialSettings,
        });

        const player = new Player({
            username: 'username', 
            money: 10, 
            index: 11, 
            id :'userid'});
        game.players = [player];


        expect(game.getPlayerById('userid')).toEqual(player);
    });
});


describe('Game class', () => {
    it('should be started', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: initialSettings,
        });
        game.startGame();
        expect(game.isStarted).toBeTruthy;
    });
});

//
describe('Game class', () => {
    it('should add a player', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: initialSettings,
        });
        const player = new Player({
            username: 'username', 
            money: 1000, 
            index: 1, 
            id :'userid'
        });

        expect(game.addPlayer({
            id:'userid',
            username: 'username'
        })).toMatchObject(player);
    });
});


//
describe('Game class', () => {
    it('should remove a player', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: initialSettings,
        });
        game.removePlayer('hostId');
        expect(game.players.length).toEqual(0);
    });
});


//
describe('Game class', () => {
    it('should do operation GetMoneyFromBank', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: initialSettings,
        });
        const  money  = 1000;
        let gameoperation : GetMoneyFromBankOperation = 
        {
            type: GameOperationType.GET_MONEY_FROM_BANK,
            playerId : 'hostId',
            money : money
        }
        let operationResult : OperationResult = 
        {
                success: true,
                message: `Банк => ${money} => ${'username'}`,
                type : GameOperationType.GET_MONEY_FROM_BANK,
                data: {
                    bankMoney: 9000,
                    user: {
                        id: 'hostId',
                        money: 2000,
                    },
                },
        }
        expect(game.doOperation(gameoperation)).toMatchObject(operationResult);

        
    });
});

/*
//defaultOperation
describe('Game class', () => {
    it('should do defaultOperation', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: defaultSettings,
        });
        game.startGame();
        expect(game.isStarted).toBeTruthy;
    });
});


//undoOperation
describe('Game class', () => {
    it('should do undoOperation', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: defaultSettings,
        });
        game.startGame();
        expect(game.isStarted).toBeTruthy;
    });
});


//redoOperation
describe('Game class', () => {
    it('should redoOperation', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: defaultSettings,
        });
        game.startGame();
        expect(game.isStarted).toBeTruthy;
    });
});


//getForwardOperation
describe('Game class', () => {
    it('should do operation', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: defaultSettings,
        });
        game.startGame();
        expect(game.isStarted).toBeTruthy;
    });
});


//getBackwardOperation
describe('Game class', () => {
    it('should do operation', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: defaultSettings,
        });
        game.startGame();
        expect(game.isStarted).toBeTruthy;
    });
});


//getmoneyfrombank
describe('Game class', () => {
    it('should get money from bank', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: defaultSettings,
        });
    });
});


*/