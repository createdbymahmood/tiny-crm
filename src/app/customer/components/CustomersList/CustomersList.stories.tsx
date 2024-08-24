import type {Meta, StoryObj} from '@storybook/react';

import customersMock from '@/lib/data-provider/mock/customers.json';

import {CustomersList} from './CustomersList';

const meta: Meta<typeof CustomersList> = {
    component: CustomersList,
};

export const Loading: StoryObj = {
    name: 'Loading CustomersList',
    args: {
        data: [],
        isLoading: true,
    },
};

export const Default: StoryObj = {
    name: 'Default CustomersList',
    args: {
        data: customersMock,
        isLoading: false,
    },
};

export default meta;
