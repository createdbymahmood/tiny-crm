import * as testIds from '../../../lib/cypress/testIds';
import type { Customer } from '../../../lib/data-provider/services/customer/customer.types';
import { paths } from '../../../lib/react-router/paths';

describe('Create Customer', () => {
    it('should show create customer form', () => {
        cy.visit(paths.customers.create);
        cy.findByTestId(testIds.createCustomer.form.root).should('be.visible');
    });

    it('should create new customer', () => {
        cy.fixture('new-customer')
            .as('newCustomer')
            .then((newCustomer: Customer) => {
                cy.visit(paths.customers.create);

                /* Type customer name */
                cy.findByTestId(testIds.createCustomer.form.elements.company)
                    .should('be.visible')
                    .type(newCustomer.company);

                /* Type customer industry */
                cy.findByTestId(testIds.createCustomer.form.elements.industry)
                    .should('be.visible')
                    .type(newCustomer.industry);

                /* Type customer about */
                cy.findByTestId(testIds.createCustomer.form.elements.about)
                    .should('be.visible')
                    .type(newCustomer.about);

                /* Type customer project's name */
                cy.findByTestId(
                    testIds.createCustomer.form.elements.projects.name,
                )
                    .should('be.visible')
                    .type(newCustomer.projects[0].name);

                /* Type customer project's contact */
                cy.findByTestId(
                    testIds.createCustomer.form.elements.projects.contact,
                )
                    .should('be.visible')
                    .type(newCustomer.projects[0].contact);
            });

        /* Submit form */
        cy.findByTestId(testIds.createCustomer.form.elements.submit).click();
        cy.location('pathname').should('eq', paths.customers.index);
    });
});
