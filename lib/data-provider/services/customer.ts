import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Customer {
    id: number;
    name: string;
    fetched_at: string;
}

type Customers = Customer[];

export const customerApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    reducerPath: 'customerApi',
    tagTypes: ['Customers'],

    endpoints: build => ({
        getCustomer: build.query<Customer, number>({
            query: id => `customer/${id}`,
            providesTags: (_result, _err, id) => [{ type: 'Customers', id }],
        }),
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        getCustomers: build.query<Customers, void>({
            query: () => `customers`,
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Customers', id } as const)),
                { type: 'Customers' as const, id: 'LIST' },
            ],
        }),
    }),
});

export const { useGetCustomerQuery, useGetCustomersQuery } = customerApi;
