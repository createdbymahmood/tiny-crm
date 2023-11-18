import * as testIds from '../../../src/lib/cypress/testIds';
import { paths } from '../../../src/lib/react-router/paths';

describe('Customers List', () => {
    beforeEach(() => {
        cy.visit(paths.customers.index);
    });

    it('should display customers list title', () => {
        cy.findByTestId(testIds.viewCustomer.list.title).should('be.visible');
    });
});
