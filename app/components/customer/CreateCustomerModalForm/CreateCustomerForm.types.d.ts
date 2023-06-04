import type { Customer } from '@lib/data-provider/services/customer/customer.types';
import type { Dayjs } from 'dayjs';

export interface CreateCustomerFormPayload extends Customer {
    start_date?: Dayjs;
    end_date?: Dayjs;
}

export type FormCancelHandle = React.MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
>;
