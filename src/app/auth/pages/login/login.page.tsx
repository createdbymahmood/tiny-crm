import * as React from 'react';
import {Helmet} from 'react-helmet-async';

import {LoginForm} from '@/app/auth/login-form';

export const Login: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet title='Login' />
      <LoginForm />
    </React.Fragment>
  );
};
