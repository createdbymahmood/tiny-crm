import {emptySplitApi as api} from './empty-api';
export const addTagTypes = ['customers', 'auth'] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: build => ({
      getCustomers: build.query<GetCustomersApiResponse, GetCustomersApiArg>({
        query: () => ({url: `/customers`}),
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
        query: queryArg => ({url: `/customers/${queryArg}`}),
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
        invalidatesTags: ['customers'],
      }),
      login: build.mutation<LoginApiResponse, LoginApiArg>({
        query: queryArg => ({url: `/login`, method: 'POST', body: queryArg}),
        invalidatesTags: ['auth'],
      }),
      getMe: build.query<GetMeApiResponse, GetMeApiArg>({
        query: () => ({url: `/me`}),
        providesTags: ['auth'],
      }),
      logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
        query: () => ({url: `/logout`, method: 'POST'}),
        invalidatesTags: ['auth'],
      }),
    }),
    overrideExisting: false,
  });
export {injectedRtkApi as generatedApi};
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
export type LoginApiResponse = /** status 200 Login successful */ {
  token?: string;
  username?: string;
};
export type LoginApiArg = {
  username?: string;
  password?: string;
};
export type GetMeApiResponse = /** status 200 User details */ {
  username?: string;
};
export type GetMeApiArg = void;
export type LogoutApiResponse = unknown;
export type LogoutApiArg = void;
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
