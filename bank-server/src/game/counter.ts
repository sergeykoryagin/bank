export class Counter {
    secondsLeft: number;
    interval: NodeJS.Timer;
    constructor(moveTime: number) {
        this.secondsLeft = moveTime;
        this.interval = setInterval(() => {
            this.secondsLeft -= 1;
            if (this.secondsLeft <= 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    }
}
