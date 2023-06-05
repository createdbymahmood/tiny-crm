import * as testIds from '../../../lib/cypress/testIds';
import type { Customer } from '../../../lib/data-provider/services/customer/customer.types';
import { paths } from '../../../lib/react-router/paths';

describe('Customers List', () => {
    beforeEach(() => {
        cy.visit(paths.customers.index);
    });

    it('should display customers list title', () => {
        cy.findByTestId(testIds.viewCustomer.list.title).should('be.visible');
    });

    it('should delete customer', () => {
        cy.fixture('customer')
            .as('customer')
            .then((customer: Customer) => {
                /* Get delete CTA */
                cy.findByTestId(testIds.deleteCustomer.cta(customer.id))
                    .should('be.visible')
                    .click();

                /* Confirm deletion */
                cy.findByText('Yes').click();

                /* Row shouldn't be visible anymore */
                cy.findAllByTestId(
                    testIds.deleteCustomer.cta(customer.id),
                ).should('not.exist');
            });
    });
});
