import {createFileRoute} from '@tanstack/react-router';
import {memo} from 'react';

import UpdateCustomer from '@/app/customer/pages/update-customer';

export const Route = createFileRoute('/_auth/customers/$customerId/update')({
  component: memo(UpdateCustomer),
});
