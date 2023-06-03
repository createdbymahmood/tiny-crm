import { urls } from '@lib/data-provider/mock/urls';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { findIndex } from 'lodash';
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
            query: id => urlCat(urls.customer, { id }),
            providesTags: (_result, _err, id) => [{ type: 'Customers', id }],
        }),

        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        getCustomers: build.query<Customers, void>({
            query: () => urls.customers,
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Customers', id } as const)),
                { type: 'Customers' as const, id: 'LIST' },
            ],
        }),

        deleteCustomer: build.mutation<
            { success: boolean; id: number },
            string
        >({
            query(id) {
                return {
                    url: urlCat(urls.customer, { id }),
                    method: 'DELETE',
                };
            },
            invalidatesTags: customer => [
                { type: 'Customers', id: customer?.id },
            ],
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
        }),

        updateCustomer: build.mutation<Customer, Partial<Customer>>({
            query(data) {
                const { id, ...body } = data;
                return {
                    url: urlCat(urls.customer, { id }),
                    method: 'PUT',
                    body,
                };
            },
            invalidatesTags: customer => [
                { type: 'Customers', id: customer?.id },
            ],
            async onQueryStarted(
                { id, ...patch },
                { dispatch, queryFulfilled },
            ) {
                const customerQueryUpdateResult = dispatch(
                    customerApi.util.updateQueryData(
                        'getCustomer',
                        id,
                        draft => {
                            // eslint-disable-next-line fp/no-mutating-assign
                            Object.assign(draft, patch);
                        },
                    ),
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
        }),
    }),
});

export const {
    useGetCustomerQuery,
    useGetCustomersQuery,
    useDeleteCustomerMutation,
    useUpdateCustomerMutation,
} = customerApi;
