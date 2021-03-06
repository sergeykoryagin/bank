import { CreditSettings } from 'src/interfaces/settings/credit-settings';
import { TimerSettings } from 'src/interfaces/settings/timer-settings';

export interface OrderSettings {
    hasOrder: boolean;
    timer: TimerSettings;
    credit: CreditSettings;
}
