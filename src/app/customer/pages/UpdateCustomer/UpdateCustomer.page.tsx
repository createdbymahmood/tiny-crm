import { useParams } from '@tanstack/react-router';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { UpdateCustomerModal } from '@/app/customer';
import { useModalRouteState } from '@/hooks';

export const UpdateCustomer: React.FC = () => {
    const { modal } = useModalRouteState();
    const customerId = useParams({ strict: false, select: s => s.customerId! });

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
