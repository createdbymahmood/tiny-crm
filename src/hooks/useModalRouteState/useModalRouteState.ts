import { MODAL_AS_ROUTE_CLOSE_DELAY } from '@configs/constants';
import { createUrl } from '@lib/react-router/createUrl';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const useModalRouteState = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const navigate = useNavigate();

    const onCancel = () => {
        setIsOpen(false);

        /* To persist animation */
        setTimeout(
            () => navigate(createUrl('customers.index')),
            MODAL_AS_ROUTE_CLOSE_DELAY,
        );
    };

    return { modal: { isOpen, onCancel } };
};
