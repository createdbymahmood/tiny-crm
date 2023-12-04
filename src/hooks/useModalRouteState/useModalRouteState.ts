import { MODAL_AS_ROUTE_CLOSE_DELAY } from '@configs/constants';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { createUrl } from '@/lib/react-router/createUrl';

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
