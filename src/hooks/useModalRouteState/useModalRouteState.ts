import { MODAL_AS_ROUTE_CLOSE_DELAY } from '@configs/constants';
import { useNavigate } from '@tanstack/react-router';
import * as React from 'react';

export const useModalRouteState = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    const navigate = useNavigate();

    const onCancel = () => {
        setIsOpen(false);

        /* To persist animation */
        setTimeout(
            () => void navigate({ to: '/customers' }),
            MODAL_AS_ROUTE_CLOSE_DELAY,
        );
    };

    return { modal: { isOpen, onCancel } };
};
