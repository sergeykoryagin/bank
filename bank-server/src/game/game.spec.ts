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

describe('Game class', () => {
    it('should be initialized', () => {
        
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: initialSettings,
        });
        expect(game).toBeDefined();
    });


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



    it('should be started', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: initialSettings,
        });
        game.startGame();
        expect(game.isStarted).toBeTruthy;
    });



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


    it('should remove a player', () => {
        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: initialSettings,
        });
        game.removePlayer('hostId');
        expect(game.players.length).toEqual(0);
    });



    it('should do operation GetMoneyFromBank', () => {
        const usermoney = 100;
        const bankmoney = 200;
        const requestmoney = 10;
        let settings : GameSettings = 
        {
        startMoney: usermoney,
        maxPlayers: 8,
        faceControl: false,
        backgroundColor: '#FFF',
        hasDice: false,
        hasMoneyRequests: false,
        hasUndoRedo: false,
        totalPayment: false,
        totalWriteOff: false,
        order: {
            hasOrder: false,
            timer: {
                hasTimer: false,
                secondsToMove: 60,
            },
            credit: {
                hasCredits: false,
                movesCount: 1,
                rate: 100,
            },
        },
        bank: {
            startMoney: bankmoney,
        },
        }

        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: settings,
        });

        let gameoperation : GetMoneyFromBankOperation = 
        {
            type: GameOperationType.GET_MONEY_FROM_BANK,
            playerId : 'hostId',
            money : requestmoney
        }

        let operationResult : OperationResult = 
        {
                success: true,
                message: `Банк => ${requestmoney} => ${'username'}`,
                type : GameOperationType.GET_MONEY_FROM_BANK,
                data: {
                    bankMoney: bankmoney - requestmoney,
                    user: {
                        id: 'hostId',
                        money: usermoney+ requestmoney,
                    },
                },
        }
        expect(game.doOperation(gameoperation)).toMatchObject(operationResult);
        expect(game.bank.money).toEqual(bankmoney - requestmoney);
        expect(game.players[0].money).toEqual(usermoney+ requestmoney);
    });




    it('should do operation SendMoneyToBankOperation', () => {
        const usermoney = 100;
        const bankmoney = 200;
        const sendmoney = 10;
        let settings : GameSettings = 
        {
        startMoney: usermoney,
        maxPlayers: 8,
        faceControl: false,
        backgroundColor: '#FFF',
        hasDice: false,
        hasMoneyRequests: false,
        hasUndoRedo: false,
        totalPayment: false,
        totalWriteOff: false,
        order: {
            hasOrder: false,
            timer: {
                hasTimer: false,
                secondsToMove: 60,
            },
            credit: {
                hasCredits: false,
                movesCount: 1,
                rate: 100,
            },
        },
        bank: {
            startMoney: bankmoney,
        },
        }

        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: settings,
        });

        let gameoperation : SendMoneyToBankOperation = 
        {
            type: GameOperationType.SEND_MONEY_TO_BANK,
            playerId : 'hostId',
            money : sendmoney
        }

        let operationResult : OperationResult = 
        {
                success: true,
                message: `Банк => ${sendmoney} => ${'username'}`,
                type : GameOperationType.GET_MONEY_FROM_BANK,
                data: {
                    bankMoney: bankmoney - sendmoney,
                    user: {
                        id: 'hostId',
                        money: usermoney+ sendmoney,
                    },
                },
        }
        expect(game.doOperation(gameoperation)).toMatchObject(operationResult);
        expect(game.bank.money).toEqual(bankmoney - sendmoney);
        expect(game.players[0].money).toEqual(usermoney+ sendmoney);
    });


    it('should do operation SendMoneyToPlayerOperation', () => {
        const usermoney = 100;
        const receivemoney = 10;
        const bankmoney = 200;
        let settings : GameSettings = 
        {
        startMoney: usermoney,
        maxPlayers: 8,
        faceControl: false,
        backgroundColor: '#FFF',
        hasDice: false,
        hasMoneyRequests: false,
        hasUndoRedo: false,
        totalPayment: false,
        totalWriteOff: false,
        order: {
            hasOrder: false,
            timer: {
                hasTimer: false,
                secondsToMove: 60,
            },
            credit: {
                hasCredits: false,
                movesCount: 1,
                rate: 100,
            },
        },
        bank: {
            startMoney: bankmoney,
        },
        }

        const game = new Game({
            host: { id: 'hostId', username: 'hostname' },
            id: 'gameId',
            settings: settings,
        });

        game.addPlayer({
            id:'receiverid',
            username: 'receivername'
        })

        let gameoperation : SendMoneyToPlayerOperation = 
        {
            type: GameOperationType.SEND_MONEY_TO_PLAYER,
            money: receivemoney,
            receiverId: 'receiverid',
            senderId: 'hostId'
        }

        let operationResult : OperationResult = 
        {
            success: true,
            type : GameOperationType.SEND_MONEY_TO_PLAYER,
            message: `${'hostname' } => ${receivemoney} => ${'receivername'}`,
            data: {
                receiver: {
                    id: 'receiverid',
                    money: usermoney + receivemoney,
                },
                sender: {
                    id: 'hostId',
                    money: usermoney - receivemoney,
                },
            },
        };
        expect(game.doOperation(gameoperation)).toMatchObject(operationResult)
        expect(game.players[0].money).toEqual(usermoney - receivemoney);
        expect(game.players[1].money).toEqual(usermoney + receivemoney);
    });



//    defaultOperation
    it('should do operation GetMoneyFromBank in defaultOperation ', () => {
        const usermoney = 100;
        const bankmoney = 200;
        const requestmoney = 10;
        let settings : GameSettings = 
        {
        startMoney: usermoney,
        maxPlayers: 8,
        faceControl: false,
        backgroundColor: '#FFF',
        hasDice: false,
        hasMoneyRequests: false,
        hasUndoRedo: false,
        totalPayment: false,
        totalWriteOff: false,
        order: {
            hasOrder: false,
            timer: {
                hasTimer: false,
                secondsToMove: 60,
            },
            credit: {
                hasCredits: false,
                movesCount: 1,
                rate: 100,
            },
        },
        bank: {
            startMoney: bankmoney,
        },
        }

        const game = new Game({
            host: { id: 'hostId', username: 'username' },
            id: 'gameId',
            settings: settings,
        });

        let gameoperation : GetMoneyFromBankOperation = 
        {
            type: GameOperationType.GET_MONEY_FROM_BANK,
            playerId : 'hostId',
            money : requestmoney
        }

        let operationResult : OperationResult = 
        {
                success: true,
                message: `Банк => ${requestmoney} => ${'username'}`,
                type : GameOperationType.GET_MONEY_FROM_BANK,
                data: {
                    bankMoney: bankmoney - requestmoney,
                    user: {
                        id: 'hostId',
                        money: usermoney+ requestmoney,
                    },
                },
        }
        expect(game.doOperation(gameoperation)).toMatchObject(operationResult);
    });
});


