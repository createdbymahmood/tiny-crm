import {Outlet} from '@tanstack/react-router';
import * as React from 'react';
import {Helmet} from 'react-helmet-async';

import {Customers as CustomersView} from '@/app/customer';
import {useGetCustomersQuery} from '@/lib/data-provider/services/api/api';

export const Customers: React.FC = () => {
  const customersQuery = useGetCustomersQuery();

  return (
    <React.Fragment>
      <Helmet title='Customers' />
      <CustomersView {...customersQuery} />
      <Outlet />
    </React.Fragment>
  );
};
