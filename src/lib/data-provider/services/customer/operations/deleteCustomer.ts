import { findIndex, includes, remove } from 'lodash';

import { urls } from '@/lib/data-provider/mock/urls';
import type { CustomerEndpointBuilder } from '@/lib/data-provider/services/customer';

import { customerApi } from '../customer';

export const deleteCustomers = (build: CustomerEndpointBuilder) =>
    build.mutation<{ success: boolean; id: number }, string[]>({
        query(ids) {
            return {
                url: urls.deleteCustomers,
                method: 'POST',
                body: { ids },
            };
        },
        invalidatesTags: customer => [{ type: 'Customers', id: customer?.id }],
        async onQueryStarted(ids, { dispatch, queryFulfilled }) {
            const customersQueryUpdateResult = dispatch(
                customerApi.util.updateQueryData(
                    'getCustomers',
                    undefined,
                    draft => {
                        const entityIndexes = ids.map(id =>
                            findIndex(draft, { id }),
                        );

                        remove(draft, (_, index) =>
                            includes(entityIndexes, index),
                        );
                    },
                ),
            );

            try {
                await queryFulfilled;
            } catch {
                customersQueryUpdateResult.undo();
            }
        },
    });
