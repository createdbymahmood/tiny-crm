import {createFileRoute} from '@tanstack/react-router';

import ViewCustomer from '@/app/customer/pages/view-customer';

export const Route = createFileRoute('/customers/$customerId')({
    component: ViewCustomer,
});
