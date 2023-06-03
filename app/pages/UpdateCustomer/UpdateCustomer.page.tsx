import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export interface UpdateCustomerProps {}

export const UpdateCustomer: React.FC<UpdateCustomerProps> = props => {
    return <Helmet title='Update Customer' />;
};
