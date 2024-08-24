import { createFileRoute } from '@tanstack/react-router';

import UpdateCustomer from '@/app/customer/pages/UpdateCustomer';

export const Route = createFileRoute('/customers/$customerId/update')({
    component: UpdateCustomer,
});
