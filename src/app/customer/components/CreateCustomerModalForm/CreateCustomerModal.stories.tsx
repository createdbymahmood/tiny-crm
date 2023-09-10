// eslint-disable-next-line import/extensions
import type { Meta, StoryObj } from '@storybook/react';

import { CreateCustomerModal } from './CreateCustomerModal';

const meta: Meta<typeof CreateCustomerModal> = {
    component: CreateCustomerModal,
    args: {
        open: true,
    },
};

export const Default: StoryObj = {
    name: 'Default CreateCustomerModal',
};

export default meta;
