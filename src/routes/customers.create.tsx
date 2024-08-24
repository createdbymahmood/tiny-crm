import {createFileRoute} from '@tanstack/react-router';

import CreateCustomer from '@/app/customer/pages/CreateCustomer';

export const Route = createFileRoute('/customers/create')({
    component: CreateCustomer,
});
