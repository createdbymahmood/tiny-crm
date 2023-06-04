// eslint-disable-next-line import/no-cycle
import {
    deleteCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
} from '@lib/data-provider/services/customer/operations';
import { createCustomer } from '@lib/data-provider/services/customer/operations/createCustomer';
import type { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
        deleteCustomer: deleteCustomer(builder),
        updateCustomer: updateCustomer(builder),
        createCustomer: createCustomer(builder),
    }),
});

export const {
    useGetCustomerQuery,
    useGetCustomersQuery,
    useDeleteCustomerMutation,
    useUpdateCustomerMutation,
    useCreateCustomerMutation,
} = customerApi;
