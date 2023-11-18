import { UpdateCustomerModal } from '@app/customer';
import { useModalRouteState } from '@hooks';
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
                customerId={customerId}
                open={modal.isOpen}
                onCancel={modal.onCancel}
            />
        </React.Fragment>
    );
};
