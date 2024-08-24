import type {Meta, StoryObj} from '@storybook/react';

import {CreateCustomerModal} from './create-customer-modal';

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
