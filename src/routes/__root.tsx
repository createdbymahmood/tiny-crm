import {createRootRouteWithContext, Outlet} from '@tanstack/react-router';
import {memo} from 'react';

import type {AppDispatch} from '@/lib/data-provider/store';

export interface RouteContext {
  dispatch: AppDispatch;
  isAuth: boolean;
}

export const Route = createRootRouteWithContext<RouteContext>()({
  component: memo(Outlet),
});
