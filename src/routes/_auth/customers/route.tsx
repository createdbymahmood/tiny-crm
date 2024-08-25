import {createFileRoute} from '@tanstack/react-router';
import {memo} from 'react';

import Customers from '@/app/customer/pages/customers';

export const Route = createFileRoute('/_auth/customers')({
  component: memo(Customers),
});
