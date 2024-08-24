import {createFileRoute} from '@tanstack/react-router';

import ViewCustomer from '@/app/customer/pages/ViewCustomer';

export const Route = createFileRoute('/customers/$customerId')({
    component: ViewCustomer,
});
