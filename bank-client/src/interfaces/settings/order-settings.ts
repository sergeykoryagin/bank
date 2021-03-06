import { CreditSettings } from 'interfaces/settings/credit-settings';
import { TimerSettings } from 'interfaces/settings/timer-settings';

export interface OrderSettings {
    hasOrder: boolean;
    timer: TimerSettings;
    credit: CreditSettings;
}
