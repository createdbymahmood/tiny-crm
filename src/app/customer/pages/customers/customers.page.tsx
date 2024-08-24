import {Outlet} from '@tanstack/react-router';
import * as React from 'react';
import {Helmet} from 'react-helmet-async';

import {CustomersList} from '@/app/customer';
import {useGetCustomersQuery} from '@/lib/data-provider/services/api';

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
