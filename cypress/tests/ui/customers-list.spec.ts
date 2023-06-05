import * as testIds from '../../../lib/cypress/testIds';
import { paths } from '../../../lib/react-router/paths';

describe('Customers List', () => {
    it('should display customers list title', () => {
        cy.visit(paths.customers.index);
        cy.findByTestId(testIds.viewCustomer.list.title).should('be.visible');
    });
});
