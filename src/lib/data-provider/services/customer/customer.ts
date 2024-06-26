import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    deleteCustomers,
    getCustomer,
    getCustomers,
    updateCustomer,
} from '@/lib/data-provider/services/customer/operations';
import { createCustomer } from '@/lib/data-provider/services/customer/operations/createCustomer';

export type CustomerEndpointBuilder = EndpointBuilder<
    BaseQueryFn<
        FetchArgs | string,
        unknown,
        FetchBaseQueryError,
        unknown,
        FetchBaseQueryMeta
    >,
    'Customers',
    'customerApi'
>;

export const customerApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    reducerPath: 'customerApi',
    tagTypes: ['Customers'],

    endpoints: builder => ({
        getCustomer: getCustomer(builder),
        getCustomers: getCustomers(builder),
        deleteCustomers: deleteCustomers(builder),
        updateCustomer: updateCustomer(builder),
        createCustomer: createCustomer(builder),
    }),
});

export const {
    useGetCustomerQuery,
    useGetCustomersQuery,
    useDeleteCustomersMutation,
    useUpdateCustomerMutation,
    useCreateCustomerMutation,
} = customerApi;
