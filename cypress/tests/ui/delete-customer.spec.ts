import * as testIds from '../../../src/lib/cypress/testIds';
import type {Customer} from '../../../src/lib/data-provider/services/__generated';

describe('Customers List', () => {
  beforeEach(() => {
    cy.visit('/customers');
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
        cy.findAllByTestId(testIds.deleteCustomer.cta(customer.id)).should(
          'not.exist',
        );
      });
  });
});
