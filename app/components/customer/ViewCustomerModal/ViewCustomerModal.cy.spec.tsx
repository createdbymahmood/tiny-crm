import * as testIds from '@lib/cypress/testIds';
import type { Customer } from '@lib/data-provider/services/customer/customer.types';

import { ViewCustomerModal } from './ViewCustomerModal';

describe('Login Form', () => {
    let customer;

    beforeEach(() => {
        cy.fixture('customer.json')
            .as('customer')
            .then((fixture: Customer) => {
                customer = fixture;
                cy.mount(<ViewCustomerModal customerId={customer.id} open />);
            });
    });

    afterEach(() => {
        customer = undefined;
    });

    it('Should setup', () => {
        cy.findByTestId(testIds.viewCustomer.content(customer.id)).should(
            'be.visible',
        );
    });
});
