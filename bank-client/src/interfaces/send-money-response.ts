export interface SendMoneyResponse {
    receiver: {
        id: string;
        money: number;
    };
    sender: {
        id: string;
        money: number;
    };
}
