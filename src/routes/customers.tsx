import {createFileRoute} from '@tanstack/react-router';

import Customers from '@/app/customer/pages/Customers';

export const Route = createFileRoute('/customers')({
    component: Customers,
});
