import Home from '@pages/Home';
import type { RouteObject } from 'react-router-dom';

import { paths } from './paths';

export const routes: RouteObject[] = [
    {
        path: paths.index,
        element: <Home />,
    },
];
