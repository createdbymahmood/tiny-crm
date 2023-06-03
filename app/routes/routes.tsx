import Home from '@pages/Home';
import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';

import { paths } from './paths';

export const routes: RouteObject[] = [
    {
        path: paths.index,
        element: <Home />,
    },
];

export const Routes: React.FC = () => useRoutes(routes);
