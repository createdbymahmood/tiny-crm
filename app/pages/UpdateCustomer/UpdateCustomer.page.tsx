import { UpdateCustomerModal } from '@components/customer/UpdateCustomerModalForm/UpdateCustomerModal';
import { useModalRouteState } from 'app/hooks/useModalRouteState';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export const UpdateCustomer: React.FC = () => {
    const { modal } = useModalRouteState();
    const customerId = useParams().id!;

    return (
        <React.Fragment>
            <Helmet title='Update Customer' />
            <UpdateCustomerModal
                open={modal.isOpen}
                onCancel={modal.onCancel}
                customerId={customerId}
            />
        </React.Fragment>
    );
};
