import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export interface ViewCustomerProps {}

export const ViewCustomer: React.FC<ViewCustomerProps> = () => {
    return <Helmet title='View Customer' />;
};
