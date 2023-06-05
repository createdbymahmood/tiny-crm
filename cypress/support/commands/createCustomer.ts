/// <reference types="cypress" />

Cypress.Commands.add('createCustomer', () => {
    /*  */
});

declare global {
    namespace Cypress {
        interface Chainable {
            createCustomer: (name: string) => void;
        }
    }
}

export {};
