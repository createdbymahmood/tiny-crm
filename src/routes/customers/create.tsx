import {createFileRoute} from '@tanstack/react-router';
import {memo} from 'react';

import CreateCustomer from '@/app/customer/pages/create-customer';

export const Route = createFileRoute('/customers/create')({
  component: memo(CreateCustomer),
});
