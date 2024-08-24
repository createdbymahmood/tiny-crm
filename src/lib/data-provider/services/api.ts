import {findIndex, includes, remove} from 'lodash';

import {generatedApi} from '@/lib/data-provider/services/__generated';
import {providesList} from '@/utils/redux';

const addTagTypes = ['customers', 'admin'] as const;

export const api = generatedApi.enhanceEndpoints({
  addTagTypes,
  endpoints: {
    deleteCustomers(endpoint) {
      endpoint.onQueryStarted = async function onQueryStarted(
        ids,
        {dispatch, queryFulfilled},
      ) {
        const customersQueryUpdateResult = dispatch(
          generatedApi.util.updateQueryData(
            'getCustomers',
            undefined,
            draft => {
              const entityIndexes = ids.map(id => findIndex(draft, {id}));

              remove(draft, (_, index) => includes(entityIndexes, index));
            },
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          customersQueryUpdateResult.undo();
        }
      };

      endpoint.invalidatesTags = [{type: 'customers'}];
    },
    updateCustomer(endpoint) {
      endpoint.onQueryStarted = async function onQueryStarted(
        {id, ...patch},
        {dispatch, queryFulfilled},
      ) {
        const customerQueryUpdateResult = dispatch(
          generatedApi.util.updateQueryData('getCustomerById', id, draft => {
            // eslint-disable-next-line fp/no-mutating-assign
            Object.assign(draft, patch);
          }),
        );

        const customersQueryUpdateResult = dispatch(
          generatedApi.util.updateQueryData(
            'getCustomers',
            undefined,
            draft => {
              const entityIndex = findIndex(draft, {id});

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
      };
    },
    getCustomers() {
      return {
        providesTags: response => {
          return providesList({
            resultsWithIds: response?.map(customer => ({
              ...customer,
              id: customer.id,
            })),
            tagType: 'customers',
          });
        },
      };
    },
    createCustomer(endpoint) {
      endpoint.invalidatesTags = ['customers'];
    },
    getCustomerById(endpoint) {
      endpoint.providesTags = customer => [
        {type: 'customers', id: customer?.id},
      ];
    },
  },
});

export const {
  useCreateCustomerMutation,
  useDeleteCustomersMutation,
  useGetCustomerByIdQuery,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} = api;
