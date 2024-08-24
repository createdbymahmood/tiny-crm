import * as testIds from '../../../src/lib/cypress/testIds';
import type {Customer} from '../../../src/lib/data-provider/services/__generated';

describe('Create Customer', () => {
    beforeEach(() => {
        cy.visit('/customers/create');
    });

    it('should show create customer form', () => {
        cy.findByTestId(testIds.createOrUpdateCustomer.form.create).should(
            'be.visible',
        );
    });

    it('should create new customer', () => {
        cy.fixture('new-customer')
            .as('newCustomer')
            .then((newCustomer: Customer) => {
                /* Type customer name */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.company,
                )
                    .should('be.visible')
                    .type(newCustomer.company);

                /* Type customer industry */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.industry,
                )
                    .should('be.visible')
                    .type(newCustomer.industry);

                /* Type customer about */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.about,
                )
                    .should('be.visible')
                    .type(newCustomer.about);

                /* Type customer project's name */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.projects.name,
                )
                    .should('be.visible')
                    .type(newCustomer.projects[0].name);

                /* Type customer project's contact */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.projects
                        .contact,
                )
                    .should('be.visible')
                    .type(newCustomer.projects[0].contact);
            });

        /* Submit form */
        cy.findByTestId(
            testIds.createOrUpdateCustomer.form.elements.submit,
        ).click();
        cy.location('pathname').should('eq', '/customers');
    });
});
