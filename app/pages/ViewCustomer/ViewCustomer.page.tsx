import { ViewCustomerModal } from '@components/customer';
import { useModalRouteState } from 'app/hooks/useModalRouteState';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export const ViewCustomer: React.FC = () => {
    const { modal } = useModalRouteState();
    const customerId = useParams().id!;

    return (
        <React.Fragment>
            <Helmet title='View Customer' />
            <ViewCustomerModal
                open={modal.isOpen}
                onCancel={modal.onCancel}
                customerId={customerId}
            />
        </React.Fragment>
    );
};
