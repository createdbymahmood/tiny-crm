import CreateCustomer from '@pages/CreateCustomer';
import Customers from '@pages/Customers';
import UpdateCustomer from '@pages/UpdateCustomer';
import ViewCustomer from '@pages/ViewCustomer';
import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import { paths } from './paths';

export const routes: RouteObject[] = [
    {
        path: paths.index,
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <Customers />,
            },
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
        path: paths.customers.index,
        element: <Navigate to={paths.index} />,
    },
];

export const Routes: React.FC = () => useRoutes(routes);
