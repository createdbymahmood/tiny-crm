import type {Meta, StoryObj} from '@storybook/react';

import {DeleteCustomerPopconfirm} from './DeleteCustomerPopconfirm';

const meta: Meta<typeof DeleteCustomerPopconfirm> = {
    component: DeleteCustomerPopconfirm,
};

export const Default: StoryObj = {
    name: 'Default DeleteCustomerPopconfirm',
    args: {
        open: true,
        customerIds: [],
    },
};

export default meta;
