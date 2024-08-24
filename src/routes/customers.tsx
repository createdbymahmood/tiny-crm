import {createFileRoute} from '@tanstack/react-router';

import Customers from '@/app/customer/pages/customers';

export const Route = createFileRoute('/customers')({
    component: Customers,
});
