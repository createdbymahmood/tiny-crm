import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';
import {z} from 'zod';

export const Route = createFileRoute('/_unauth')({
  component: Outlet,
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),

  beforeLoad({context, search}) {
    if (context.isAuth)
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw redirect({
        to: search.redirect ?? '/customers',
      });
  },
});
