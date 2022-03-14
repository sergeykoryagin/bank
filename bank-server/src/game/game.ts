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

export class Game {
    id: string;
    isStarted = false;
    hostId: string;
    settings: GameSettings;
    bank: Bank;
    players: Array<Player> = [];
    private operations: Array<GameOperation> = [];
    private prevOperations: Array<GameOperation> = [];
    private moveTimer?: Counter;

    constructor({ host, settings, id }: GameConfig) {
        this.id = id;
        this.settings = settings;

        this.hostId = host.id;
        const hostPlayer = new Player({ ...host, money: settings.startMoney, index: 0 });
        this.players.push(hostPlayer);

        this.bank = new Bank({
            startMoney: settings.bank.startMoney,
            hasCredits: settings.order.credit.hasCredits,
        });

        if (settings.order.hasOrder && settings.order.timer.hasTimer) {
            this.moveTimer = new Counter(this.settings.order.timer.secondsToMove);
        }
    }

    getPlayerById(id: string): Player | undefined {
        return this.players.find((player) => player.id === id);
    }

    startGame() {
        this.isStarted = true;
    }

    addPlayer(user: User) {
        if (!this.getPlayerById(user.id) && !this.isStarted) {
            const newIndex = this.players.length;
            const player = new Player({
                ...user,
                money: this.settings.startMoney,
                index: newIndex,
            });
            this.players.push(player);
            return player;
        }
    }

    removePlayer(playerId: string) {
        this.players = this.players.filter((player) => player.id !== playerId);
    }

    doOperation = (operation: GameOperation, forward = true): OperationResult | void => {
        const operationMethod = forward
            ? (this.getForwardOperation(operation.type) as OperationMethod)
            : (this.getBackwardOperation(operation.type) as OperationMethod);
        return operationMethod(operation);
    };

    defaultOperation = (operation: GameOperation): OperationResult | void => {
        this.prevOperations = [];
        const operationResult = this.doOperation(operation);
        if (operationResult?.success) {
            this.operations.push(operation);
        }
        return operationResult;
    };

    undoOperation = (): OperationResult | void => {
        const lastOperation = this.operations.pop();
        if (lastOperation) {
            const operationResult = this.doOperation(lastOperation, false);
            if (operationResult?.success) {
                this.prevOperations.push(lastOperation);
                return {
                    ...operationResult,
                    message: `Отмена операции: ${operationResult.message}`,
                };
            }
        }
    };

    redoOperation = (): OperationResult | void => {
        const lastOperation = this.prevOperations.pop();
        if (lastOperation) {
            const operationResult = this.doOperation(lastOperation);
            if (operationResult?.success) {
                this.operations.push(lastOperation);
                return {
                    ...operationResult,
                    message: `Повтор операции: ${operationResult.message}`,
                };
            }
        }
    };

    private getForwardOperation = (operationType: GameOperationType) => {
        switch (operationType) {
            case GameOperationType.GET_MONEY_FROM_BANK:
                return this.getMoneyFromBank;
            case GameOperationType.SEND_MONEY_TO_BANK:
                return this.sendMoneyToBank;
            case GameOperationType.SEND_MONEY_TO_PLAYER:
                return this.sendMoneyToPlayer;
            case GameOperationType.TOTAL_PAYMENT:
                return this.totalPayment;
            case GameOperationType.TOTAL_WRITE_OFF:
                return this.totalWriteOff;
            case GameOperationType.GET_CREDIT:
                return this.getCredit;
            case GameOperationType.REPAYMENT_CREDIT:
                return this.repaymentCredit;
        }
    };

    private getBackwardOperation = (operationType: GameOperationType) => {
        switch (operationType) {
            case GameOperationType.GET_MONEY_FROM_BANK:
                return this.sendMoneyToBank;
            case GameOperationType.SEND_MONEY_TO_BANK:
                return this.getMoneyFromBank;
            case GameOperationType.SEND_MONEY_TO_PLAYER:
                return this.sendMoneyToPlayerBackward;
            case GameOperationType.TOTAL_PAYMENT:
                return this.totalWriteOff;
            case GameOperationType.TOTAL_WRITE_OFF:
                return this.totalPayment;
            case GameOperationType.GET_CREDIT:
                return this.repaymentCredit;
            case GameOperationType.REPAYMENT_CREDIT:
                return this.getCredit;
        }
    };

    private getMoneyFromBank = ({
        playerId,
        money,
        type,
    }: GetMoneyFromBankOperation): OperationResult | void => {
        const player = this.getPlayerById(playerId);
        if (player && this.bank.money >= money) {
            this.bank.money -= money;
            player.money += money;
            return {
                success: true,
                message: `Банк => ${money} => ${player.username}`,
                type,
                data: {
                    bankMoney: this.bank.money,
                    user: {
                        id: playerId,
                        money: player.money,
                    },
                },
            };
        }
    };

    private sendMoneyToBank = ({
        type,
        playerId,
        money,
    }: SendMoneyToBankOperation): OperationResult | void => {
        const player = this.getPlayerById(playerId);
        if (player && player.money >= money) {
            this.bank.money += money;
            player.money -= money;
            return {
                success: true,
                message: `${player.username} => ${money} => Банк`,
                type,
                data: {
                    bankMoney: this.bank.money,
                    user: {
                        id: playerId,
                        money: player.money,
                    },
                },
            };
        }
    };

    private sendMoneyToPlayer = ({
        type,
        money,
        senderId,
        receiverId,
    }: SendMoneyToPlayerOperation): OperationResult | void => {
        const sender = this.getPlayerById(senderId);
        const receiver = this.getPlayerById(receiverId);
        if (sender && receiver && sender.money >= money) {
            receiver.money += money;
            sender.money -= money;
            return {
                success: true,
                type,
                message: `${sender.username} => ${money} => ${receiver.username}`,
                data: {
                    receiver: {
                        id: receiverId,
                        money: receiver.money,
                    },
                    sender: {
                        id: sender.id,
                        money: sender.money,
                    },
                },
            };
        }
    };

    private totalPayment = ({ type }: TotalPaymentOperation): OperationResult | void => {
        return {
            success: false,
            message: `Ошибка операции`,
            type,
        };
    };

    private totalWriteOff = ({ type }: TotalWriteOffOperation): OperationResult | void => {
        return {
            success: false,
            message: `Ошибка операции`,
            type,
        };
    };

    private getCredit = ({ type }: GetCreditOperation): OperationResult | void => {
        return {
            success: false,
            message: `Ошибка операции`,
            type,
        };
    };

    private repaymentCredit = ({ type }: RepaymentCreditOperation): OperationResult | void => {
        return {
            success: false,
            message: `Ошибка операции`,
            type,
        };
    };

    private sendMoneyToPlayerBackward = ({
        type,
        senderId,
        receiverId,
        money,
    }: SendMoneyToPlayerOperation): OperationResult | void => {
        const sender = this.getPlayerById(senderId);
        const receiver = this.getPlayerById(receiverId);
        if (sender && receiver && sender.money >= money) {
            sender.money += money;
            receiver.money -= money;
            return {
                success: true,
                type,
                message: `${sender.username} => ${money} => ${receiver.username}`,
                data: {
                    receiver: {
                        id: receiverId,
                        money: receiver.money,
                    },
                    sender: {
                        id: sender.id,
                        money: sender.money,
                    },
                },
            };
        }
    };
}
