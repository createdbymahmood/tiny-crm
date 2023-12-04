import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { CreateCustomerModal } from '@/app/customer';
import { useModalRouteState } from '@/hooks';

export const CreateCustomer: React.FC = () => {
    const { modal } = useModalRouteState();

    return (
        <React.Fragment>
            <Helmet title='Create Customer' />
            <CreateCustomerModal
                open={modal.isOpen}
                onCancel={modal.onCancel}
            />
        </React.Fragment>
    );
};
