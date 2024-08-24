import type {Meta, StoryObj} from '@storybook/react';

import customersMock from '@/lib/data-provider/mock/customers.json';

import {ViewCustomerModal} from './ViewCustomerModal';

const meta: Meta<typeof ViewCustomerModal> = {
    component: ViewCustomerModal,
    args: {
        open: true,
    },
};

export const Error: StoryObj = {
    name: 'Error ViewCustomerModal',
    args: {
        customerId: undefined,
    },
};

export const Default: StoryObj = {
    name: 'Default ViewCustomerModal',
    args: {
        customerId: customersMock[0]?.id,
    },
};

export default meta;
