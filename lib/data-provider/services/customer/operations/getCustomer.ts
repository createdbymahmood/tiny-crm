import { urls } from '@lib/data-provider/mock/urls';
import type { CustomerEndpointBuilder } from '@lib/data-provider/services/customer';
import urlcat from 'urlcat';

import type * as types from '../customer.types.d';

export const getCustomer = (build: CustomerEndpointBuilder) =>
    build.query<types.Customer, string>({
        query: id => urlcat(urls.customer, { id }),
        providesTags: (_result, _err, id) => [{ type: 'Customers', id }],
    });
