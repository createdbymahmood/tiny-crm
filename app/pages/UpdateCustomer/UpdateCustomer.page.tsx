import { UpdateCustomerModal } from '@components/customer/UpdateCustomerModalForm/UpdateCustomerModal';
import { useModalRouteState } from 'app/hooks/useModalRouteState';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export const UpdateCustomer: React.FC = () => {
    const { modal } = useModalRouteState();
    return (
        <React.Fragment>
            <Helmet title='Update Customer' />
            <UpdateCustomerModal
                open={modal.isOpen}
                onCancel={modal.onCancel}
            />
        </React.Fragment>
    );
};
