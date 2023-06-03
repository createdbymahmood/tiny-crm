import { ViewCustomerModal } from '@components/customer';
import { MODAL_AS_ROUTE_CLOSE_DELAY } from '@configs/constants';
import { createRoute } from '@routes/createRoute';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

const useViewCustomerState = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const navigate = useNavigate();

    const onCancel = () => {
        setIsOpen(false);

        /* To persist animation */
        setTimeout(
            () => navigate(createRoute('customers.index')),
            MODAL_AS_ROUTE_CLOSE_DELAY,
        );
    };

    return { modal: { isOpen, onCancel } };
};

export const ViewCustomer: React.FC = () => {
    const { modal } = useViewCustomerState();

    return (
        <React.Fragment>
            <Helmet title='View Customer' />
            <ViewCustomerModal open={modal.isOpen} onCancel={modal.onCancel} />
        </React.Fragment>
    );
};
