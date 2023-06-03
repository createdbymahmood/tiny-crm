import { CustomersList } from '@components/customer';
import { useGetCustomersQuery } from '@lib/data-provider/services/customer';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export const Customers: React.FC = () => {
    const customersQuery = useGetCustomersQuery();

    return (
        <React.Fragment>
            <Helmet title='Customers' />
            <CustomersList {...customersQuery} />
            <Outlet />
        </React.Fragment>
    );
};
