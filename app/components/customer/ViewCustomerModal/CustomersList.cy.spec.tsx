import type { Customers } from '@lib/data-provider/services/customer/customer.types';

import { CustomersList } from '../CustomersList/CustomersList';

describe('Login Form', () => {
    beforeEach(() => {
        cy.fixture('customers.json')
            .as('customers')
            .then(customers => {
                cy.mount(
                    <CustomersList
                        data={customers as Customers}
                        isLoading={false}
                    />,
                );
            });
    });

    it('Should setup', () => {
        console.log('SETUP');
    });
});
