import { ViewCustomerModal } from '@components/customer';
import { useModalRouteState } from 'app/hooks/useModalRouteState';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export const ViewCustomer: React.FC = () => {
    const { modal } = useModalRouteState();

    return (
        <React.Fragment>
            <Helmet title='View Customer' />
            <ViewCustomerModal open={modal.isOpen} onCancel={modal.onCancel} />
        </React.Fragment>
    );
};
