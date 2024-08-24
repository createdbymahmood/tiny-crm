import type {Meta, StoryObj} from '@storybook/react';

import customersMock from '@/lib/data-provider/mock/customers.json';

import {UpdateCustomerModal} from './update-customer-modal';

const meta: Meta<typeof UpdateCustomerModal> = {
  component: UpdateCustomerModal,
  args: {
    open: true,
  },
};

export const Error: StoryObj = {
  name: 'Error UpdateCustomerModal',
  args: {
    customerId: undefined,
  },
};

export const Default: StoryObj = {
  name: 'Default UpdateCustomerModal',
  args: {
    customerId: customersMock[0]?.id,
  },
};

export default meta;
