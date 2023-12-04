import { findIndex } from 'lodash';
import urlcat from 'urlcat';

import { urls } from '@/lib/data-provider/mock/urls';
import type { CustomerEndpointBuilder } from '@/lib/data-provider/services/customer';
import { customerApi } from '@/lib/data-provider/services/customer';

import type * as types from '../customer.types';

export const updateCustomer = (build: CustomerEndpointBuilder) =>
    build.mutation<types.Customer, Partial<types.Customer>>({
        query(data) {
            const { id, ...body } = data;
            return {
                url: urlcat(urls.customer, { id }),
                method: 'PUT',
                body,
            };
        },
        invalidatesTags: customer => [{ type: 'Customers', id: customer?.id }],
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
            const customerQueryUpdateResult = dispatch(
                customerApi.util.updateQueryData('getCustomer', id!, draft => {
                    // eslint-disable-next-line fp/no-mutating-assign
                    Object.assign(draft, patch);
                }),
            );

            const customersQueryUpdateResult = dispatch(
                customerApi.util.updateQueryData(
                    'getCustomers',
                    undefined,
                    draft => {
                        const entityIndex = findIndex(draft, { id });

                        if (entityIndex > -1) {
                            // eslint-disable-next-line fp/no-mutating-assign
                            Object.assign(draft[entityIndex], patch);
                        }
                    },
                ),
            );

            try {
                await queryFulfilled;
            } catch {
                customerQueryUpdateResult.undo();
                customersQueryUpdateResult.undo();
            }
        },
    });
