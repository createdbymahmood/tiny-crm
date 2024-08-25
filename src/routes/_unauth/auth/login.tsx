import {createFileRoute} from '@tanstack/react-router';
import {memo} from 'react';

import Login from '@/app/auth/pages/login';

export const Route = createFileRoute('/_unauth/auth/login')({
  component: memo(Login),
});
