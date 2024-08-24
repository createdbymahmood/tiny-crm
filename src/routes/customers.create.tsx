import {createFileRoute} from '@tanstack/react-router';

import CreateCustomer from '@/app/customer/pages/create-customer';

export const Route = createFileRoute('/customers/create')({
    component: CreateCustomer,
});
