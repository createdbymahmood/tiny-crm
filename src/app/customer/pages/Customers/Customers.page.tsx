import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import { CustomersList } from '@/app/customer';
import { useGetCustomersQuery } from '@/lib/data-provider/services/customer';

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
