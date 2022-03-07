import { GetCreditOperation } from 'interfaces/operations/get-credit-operation';
import { GetMoneyFromBankOperation } from 'interfaces/operations/get-money-from-bank-operation';
import { RepaymentCreditOperation } from 'interfaces/operations/repayment-credit-operation';
import { SendMoneyToBankOperation } from 'interfaces/operations/send-money-to-bank-operation';
import { SendMoneyToPlayerOperation } from 'interfaces/operations/send-money-to-player-operation';
import { TotalPaymentOperation } from 'interfaces/operations/total-payment-operation';
import { TotalWriteOffOperation } from 'interfaces/operations/total-write-off-operation';

export type GameOperation =
    | RepaymentCreditOperation
    | GetCreditOperation
    | TotalPaymentOperation
    | TotalWriteOffOperation
    | GetMoneyFromBankOperation
    | SendMoneyToBankOperation
    | SendMoneyToPlayerOperation;
