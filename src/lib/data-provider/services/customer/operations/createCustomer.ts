import { urls } from '@lib/data-provider/mock/urls';
import type { CustomerEndpointBuilder } from '@lib/data-provider/services/customer';

import type * as types from '../customer.types';

export const createCustomer = (build: CustomerEndpointBuilder) =>
    build.mutation<types.Customer, Partial<types.Customer>>({
        query(body) {
            return {
                url: urls.customers,
                method: 'POST',
                body,
            };
        },
        invalidatesTags: ['Customers'],
    });
