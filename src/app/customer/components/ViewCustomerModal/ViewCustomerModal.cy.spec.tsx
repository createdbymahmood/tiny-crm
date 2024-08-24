import { Providers } from '@/app/general';
import * as testIds from '@/lib/cypress/testIds';

import { ViewCustomerModal } from './ViewCustomerModal';
import { Customer } from '@/lib/data-provider/services/__generated';

describe('Login Form', () => {
    let customer;

    beforeEach(() => {
        cy.fixture('customer.json')
            .as('customer')
            .then((fixture: Customer) => {
                customer = fixture;
                cy.mount(
                    <Providers>
                        <ViewCustomerModal customerId={customer.id} open />
                    </Providers>,
                );
            });
    });

    afterEach(() => {
        customer = undefined;
    });

    it('Should be visible', () => {
        cy.findByTestId(testIds.viewCustomer.content(customer.id)).should(
            'be.visible',
        );
    });
});
