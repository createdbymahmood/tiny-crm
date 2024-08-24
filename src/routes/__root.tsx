import {createRootRoute, Outlet} from '@tanstack/react-router';
import {memo} from 'react';

export const Route = createRootRoute({
  component: memo(Outlet),
});
