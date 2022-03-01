export interface BankOperationResponse {
    user: {
        id: string;
        money: number;
    };
    bankMoney: number;
    message: string;
}
