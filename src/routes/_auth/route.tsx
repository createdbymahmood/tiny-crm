import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: Outlet,
  beforeLoad({context, ...props}) {
    if (!context.isAuth) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: props.location.pathname,
        },
      });
    }
  },
});
