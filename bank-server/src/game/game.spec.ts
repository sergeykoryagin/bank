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

describe('Game class', () => {
    const usermoney = 100;
    const bankmoney = 200;
    const sendmoney = 10;
    const requestmoney = 10;

    const hostId = 'hostid';
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
                message:`${'username'} => ${gameoperation.money} => Банк`,
                type : gameoperation.type,
                data: {
                    bankMoney: bankmoney + sendmoney,
                    user: {
                        id: 'hostId',
                        money: usermoney -sendmoney,
                    },
                },
        }
        expect(game.doOperation(gameoperation)).toMatchObject(operationResult);
        expect(game.bank.money).toEqual(bankmoney + sendmoney);
        expect(game.players[0].money).toEqual(usermoney- sendmoney);
    });


    it('should do operation SendMoneyToPlayerOperation', () => {
        const receivemoney = 10;
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


    //undooperation
    it('should do operation GetMoneyFromBank in undooperation ', () => {

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

        const undooperationresult =
        {
                message: `Отмена операции: ${'username'} => ${gameoperation.money} => Банк`
        }
        game.defaultOperation(gameoperation);
        expect(game.bank.money).toEqual(bankmoney - requestmoney);
        expect(game.players[0].money).toEqual(usermoney+ requestmoney);
        expect(game.undoOperation()).toMatchObject(undooperationresult);
        expect(game.bank.money).toEqual(bankmoney);
        expect(game.players[0].money).toEqual(usermoney);
    });


    it('should do operation SendMoneyToBankOperation in undooperation ', () => {

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
        const undooperationresult =
        {
                message: `Отмена операции: Банк => ${requestmoney} => ${'username'}`
        }
        game.defaultOperation(gameoperation);
        expect(game.bank.money).toEqual(bankmoney + sendmoney);
        expect(game.players[0].money).toEqual(usermoney - sendmoney);

        expect(game.undoOperation()).toMatchObject(undooperationresult);
        expect(game.bank.money).toEqual(bankmoney);
        expect(game.players[0].money).toEqual(usermoney);
    });



    it('should do operation SendMoneyToPlayerOperation in undooperation ', () => {

        const receivemoney = 10;
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

        const undooperationresult =
        {
            message: `Отмена операции: ${'hostname' } => ${receivemoney} => ${'receivername'}`
        }

        game.defaultOperation(gameoperation);

        expect(game.players[0].money).toEqual(usermoney - receivemoney);
        expect(game.players[1].money).toEqual(usermoney + receivemoney);

        expect(game.undoOperation()).toMatchObject(undooperationresult);
        expect(game.players[0].money).toEqual(usermoney );
        expect(game.players[1].money).toEqual(usermoney );

    });


    //redoOperation
    it('should do operation GetMoneyFromBank in redoOperation ', () => {

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

        const redooperationresult =
        {
            message: `Повтор операции: Банк => ${requestmoney} => ${'username'}`,
        }
        game.defaultOperation(gameoperation);
        expect(game.bank.money).toEqual(bankmoney - requestmoney);
        expect(game.players[0].money).toEqual(usermoney+ requestmoney);
        game.undoOperation();
        expect(game.redoOperation()).toMatchObject(redooperationresult);
        expect(game.bank.money).toEqual(bankmoney -requestmoney);
        expect(game.players[0].money).toEqual(usermoney + requestmoney);
    });

    it('should do operation SendMoneyToBankOperation in redoOperation ', () => {

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

        const redooperationresult =
        {
            message: `Повтор операции: ${'username'} => ${gameoperation.money} => Банк`
        }
        game.defaultOperation(gameoperation);
        expect(game.bank.money).toEqual(bankmoney + sendmoney);
        expect(game.players[0].money).toEqual(usermoney - sendmoney);
        game.undoOperation();
        expect(game.redoOperation()).toMatchObject(redooperationresult);
        expect(game.bank.money).toEqual(bankmoney + sendmoney);
        expect(game.players[0].money).toEqual(usermoney - sendmoney);
    });



    it('should do operation SendMoneyToPlayerOperation in redoOperation ', () => {

        const receivemoney = 10;
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

        const redooperationresult =
        {
            message: `Повтор операции: ${'hostname' } => ${receivemoney} => ${'receivername'}`
        }

        game.defaultOperation(gameoperation);

        expect(game.players[0].money).toEqual(usermoney - receivemoney);
        expect(game.players[1].money).toEqual(usermoney + receivemoney);
        game.undoOperation();
        expect(game.redoOperation()).toMatchObject(redooperationresult);
    });

});

