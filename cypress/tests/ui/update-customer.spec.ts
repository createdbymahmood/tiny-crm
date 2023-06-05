import urlcat from 'urlcat';

import * as testIds from '../../../lib/cypress/testIds';
import type { Customer } from '../../../lib/data-provider/services/customer/customer.types';
import { paths } from '../../../lib/react-router/paths';

describe('pdate Customer', () => {
    it('should show update customer form', () => {
        cy.fixture('customer.json')
            .as('customer')
            .then((customer: Customer) => {
                cy.visit(urlcat(paths.customers.update, { id: customer.id }));
            });
        cy.findByTestId(testIds.createOrUpdateCustomer.form.update).should(
            'be.visible',
        );
    });

    it('should should update current customer', () => {
        cy.fixture('new-customer')
            .as('newCustomer')
            .then((newCustomer: Customer) => {
                cy.visit(
                    urlcat(paths.customers.update, { id: newCustomer.id }),
                );

                /* Clear previous customer name */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.company,
                )
                    .should('be.visible')
                    .clear()
                    .type(newCustomer.company);

                /* Type customer industry */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.industry,
                )
                    .should('be.visible')
                    .clear()
                    .type(newCustomer.industry);

                /* Type customer about */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.about,
                )
                    .should('be.visible')
                    .clear()
                    .type(newCustomer.about);

                /* Type customer project's name */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.projects.name,
                )
                    .should('be.visible')
                    .clear()
                    .type(newCustomer.projects[0].name);

                /* Type customer project's contact */
                cy.findByTestId(
                    testIds.createOrUpdateCustomer.form.elements.projects
                        .contact,
                )
                    .should('be.visible')
                    .clear()
                    .type(newCustomer.projects[0].contact);
            });

        /* Submit form */
        cy.findByTestId(
            testIds.createOrUpdateCustomer.form.elements.submit,
        ).click();
        cy.location('pathname').should('eq', paths.customers.index);
    });
});
