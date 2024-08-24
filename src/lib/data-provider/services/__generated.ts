import { emptySplitApi as api } from './emptyApi';
export const addTagTypes = ['customers', 'admin'] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: build => ({
            getCustomers: build.query<
                GetCustomersApiResponse,
                GetCustomersApiArg
            >({
                query: () => ({ url: `/customers` }),
                providesTags: ['customers'],
            }),
            createCustomer: build.mutation<
                CreateCustomerApiResponse,
                CreateCustomerApiArg
            >({
                query: queryArg => ({
                    url: `/customers`,
                    method: 'POST',
                    body: queryArg,
                }),
                invalidatesTags: ['customers'],
            }),
            getCustomerById: build.query<
                GetCustomerByIdApiResponse,
                GetCustomerByIdApiArg
            >({
                query: queryArg => ({ url: `/customers/${queryArg}` }),
                providesTags: ['customers'],
            }),
            updateCustomer: build.mutation<
                UpdateCustomerApiResponse,
                UpdateCustomerApiArg
            >({
                query: queryArg => ({
                    url: `/customers/${queryArg.id}`,
                    method: 'PUT',
                    body: queryArg.customer,
                }),
                invalidatesTags: ['customers'],
            }),
            deleteCustomers: build.mutation<
                DeleteCustomersApiResponse,
                DeleteCustomersApiArg
            >({
                query: queryArg => ({
                    url: `/deleteCustomers`,
                    method: 'POST',
                    body: queryArg,
                }),
                invalidatesTags: ['admin'],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as generatedApi };
export type GetCustomersApiResponse =
    /** status 200 List of customers */ Customer[];
export type GetCustomersApiArg = void;
export type CreateCustomerApiResponse =
    /** status 201 Customer created successfully */ Customer;
export type CreateCustomerApiArg = Customer;
export type GetCustomerByIdApiResponse =
    /** status 200 Customer details */ Customer;
export type GetCustomerByIdApiArg = string;
export type UpdateCustomerApiResponse =
    /** status 200 Customer updated successfully */ Customer;
export type UpdateCustomerApiArg = {
    id: string;
    customer: Customer;
};
export type DeleteCustomersApiResponse =
    /** status 200 Customers deleted successfully */ {
        ids?: string[];
        success?: boolean;
    };
export type DeleteCustomersApiArg = string[];
export type Project = {
    id?: string;
    name?: string;
    contact?: string | null;
    start_date?: string | null;
    end_date?: string | null;
};
export type Customer = {
    id?: string;
    isActive?: boolean;
    company?: string;
    industry?: string;
    projects?: Project[];
    about?: string;
};
