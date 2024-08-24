import * as testIds from '../../../src/lib/cypress/testIds';

describe('Customers List', () => {
  beforeEach(() => {
    cy.visit('/customers');
  });

  it('should display customers list title', () => {
    cy.findByTestId(testIds.viewCustomer.list.title).should('be.visible');
  });
});
