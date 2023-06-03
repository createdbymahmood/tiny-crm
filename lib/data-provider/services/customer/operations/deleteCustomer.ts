import { urls } from '@lib/data-provider/mock/urls';
import type { CustomerEndpointBuilder } from '@lib/data-provider/services/customer';
import { findIndex } from 'lodash';
import urlcat from 'urlcat';

// eslint-disable-next-line import/no-cycle
import { customerApi } from '../customer';

export const deleteCustomer = (build: CustomerEndpointBuilder) =>
    build.mutation<{ success: boolean; id: number }, string>({
        query(id) {
            return {
                url: urlcat(urls.customer, { id }),
                method: 'DELETE',
            };
        },
        invalidatesTags: customer => [{ type: 'Customers', id: customer?.id }],
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
            const customersQueryUpdateResult = dispatch(
                customerApi.util.updateQueryData(
                    'getCustomers',
                    undefined,
                    draft => {
                        const entityIndex = findIndex(draft, { id });

                        if (entityIndex > -1) {
                            draft.splice(entityIndex, 1);
                        }
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
