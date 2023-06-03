import { urls } from '@lib/data-provider/mock/urls';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import urlCat from 'urlcat';

export interface Project {
    id: string;
    name: string;
    contact: string | null;
    start_date: string | null;
    end_date: string | null;
}

export interface Customer {
    id: string;
    isActive: boolean;
    company: string;
    industry: string;
    projects: Project[];
    about: string;
}

type Customers = Customer[];

export const customerApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    reducerPath: 'customerApi',
    tagTypes: ['Customers'],

    endpoints: build => ({
        getCustomer: build.query<Customer, string>({
            query: id => urlCat(urls.getCustomer, { id }),
            providesTags: (_result, _err, id) => [{ type: 'Customers', id }],
        }),
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        getCustomers: build.query<Customers, void>({
            query: () => urls.getCustomers,
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Customers', id } as const)),
                { type: 'Customers' as const, id: 'LIST' },
            ],
        }),
    }),
});

export const { useGetCustomerQuery, useGetCustomersQuery } = customerApi;
