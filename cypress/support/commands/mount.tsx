import { mount } from 'cypress/react18';

import { Providers } from '../../../app/components/providers';

Cypress.Commands.add(
    'mount',
    (...[element, ...rest]: Parameters<typeof mount>) =>
        mount(<Providers>{element}</Providers>, ...rest),
);

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}
