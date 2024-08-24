import type {Dayjs} from 'dayjs';

import type {Customer, Project} from '@/lib/data-provider/services/__generated';

export interface CreateCustomerFormPayload extends Customer {
  projects: (Project & {
    start_date?: Dayjs;
    end_date?: Dayjs;
  })[];
}

export type FormCancelHandle = React.MouseEventHandler<
  HTMLAnchorElement | HTMLButtonElement
>;
