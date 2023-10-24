import React from 'react';
import type { Preview } from '@storybook/react';
// import { Providers } from '../app/components/providers/Providers';
import { Providers } from '../src/app/general/components/providers';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        Story => {
            return (
                <Providers>
                    <Story />
                </Providers>
            );
        },
    ],
};

export default preview;
