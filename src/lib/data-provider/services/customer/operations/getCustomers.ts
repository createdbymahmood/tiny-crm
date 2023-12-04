import { urls } from '@/lib/data-provider/mock/urls';
import type { CustomerEndpointBuilder } from '@/lib/data-provider/services/customer';

import type * as types from '../customer.types.d';

export const getCustomers = (build: CustomerEndpointBuilder) =>
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    build.query<types.Customers, void>({
        query: () => urls.customers,
        providesTags: (result = []) => [
            ...result.map(({ id }) => ({ type: 'Customers', id } as const)),
            { type: 'Customers' as const, id: 'LIST' },
        ],
    });
