import { GameSettings } from 'interfaces/settings/game-settings';

export const initialSettings: GameSettings = {
    startMoney: 16000,
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
        startMoney: Number.MAX_SAFE_INTEGER,
    },
};
