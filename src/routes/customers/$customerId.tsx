import {createFileRoute} from '@tanstack/react-router';
import {memo} from 'react';

import ViewCustomer from '@/app/customer/pages/view-customer';

export const Route = createFileRoute('/customers/$customerId')({
  component: memo(ViewCustomer),
});
