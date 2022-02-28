import { Settings } from 'src/interfaces/settings';

export const defaultSettings: Settings = {
    startMoney: 16000,
    maxPLayers: 8,
    bankSettings: {
        bankStartMoney: Number.MAX_SAFE_INTEGER,
    },
};
