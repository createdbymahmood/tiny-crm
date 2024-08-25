import {createFileRoute} from '@tanstack/react-router';
import {memo} from 'react';

import {LoginForm} from '@/app/auth';

export const Route = createFileRoute('/_unauth/auth/login')({
  component: memo(LoginForm),
});
