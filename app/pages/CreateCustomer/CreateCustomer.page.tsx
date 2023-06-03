import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export interface CreateCustomerProps {}

export const CreateCustomer: React.FC<CreateCustomerProps> = props => {
    return <Helmet title='Create Customer' />;
};
