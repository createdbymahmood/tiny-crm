import {findIndex, includes, remove} from 'lodash';

import {
  addTagTypes,
  generatedApi,
} from '@/lib/data-provider/services/api/__generated';
import {providesList} from '@/utils/redux';

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
                Object.assign(draft[entityIndex], patch.customer);
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
    getCustomers: {
      providesTags: response => {
        return providesList({
          resultsWithIds: response?.map(customer => ({
            ...customer,
            id: customer.id!,
          })),
          tagType: 'customers',
        });
      },
    },
    getCustomerById(endpoint) {
      endpoint.providesTags = customer => [
        {type: 'customers', id: customer?.id},
      ];
    },
    login: {
      invalidatesTags: [],
    },
    logout: {
      invalidatesTags: [],
    },
  },
});

export const {
  useCreateCustomerMutation,
  useDeleteCustomersMutation,
  useGetCustomerByIdQuery,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
} = api;
