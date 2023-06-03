import { CustomersList } from '@components/customer';
import { Container } from '@components/design-system';
import { useGetCustomersQuery } from '@lib/data-provider/services/customer';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

export const Customers: React.FC = () => {
    const customersQuery = useGetCustomersQuery();

    return (
        <Container>
            <Helmet title='Customers' />
            <CustomersList {...customersQuery} />
            <Outlet />
        </Container>
    );
};
