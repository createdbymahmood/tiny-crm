import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, useRoutes } from 'react-router-dom';

import CreateCustomer from '@/app/customer/pages/CreateCustomer';
import Customers from '@/app/customer/pages/Customers';
import UpdateCustomer from '@/app/customer/pages/UpdateCustomer';
import ViewCustomer from '@/app/customer/pages/ViewCustomer';
import { paths } from '@/lib/react-router/paths';

export const routes: RouteObject[] = [
    {
        path: paths.customers.index,
        element: <Customers />,
        children: [
            {
                path: paths.customers.view,
                element: <ViewCustomer />,
            },
            {
                path: paths.customers.create,
                element: <CreateCustomer />,
            },
            {
                path: paths.customers.update,
                element: <UpdateCustomer />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={paths.customers.index} />,
    },
];

export const Routes: React.FC = () => useRoutes(routes);
