import urlcat from 'urlcat';

import * as testIds from '../../../lib/cypress/testIds';
import { paths } from '../../../lib/react-router/paths';

describe('View Customer', () => {
    beforeEach(() => {
        cy.visit(paths.customers.index);
    });

    it('should display customer list modal', () => {
        cy.fixture('customer').then(customer => {
            /* Click on view button */
            cy.findByTestId(testIds.viewCustomer.cta(customer.id))
                .should('be.visible')
                .click();

            /* User must be redirected to view customer page */
            cy.location('pathname').should(
                'eq',
                urlcat(paths.customers.view, { id: customer.id }),
            );

            /* Should see the content */
            cy.findByTestId(testIds.viewCustomer.content(customer.id))
                .should('be.visible')
                .click();
        });
    });
});
