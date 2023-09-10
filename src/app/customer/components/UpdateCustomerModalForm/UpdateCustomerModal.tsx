import { UpdateCusomterForm } from '@app/customer';
import { useGetCustomerQuery } from '@lib/data-provider/services/customer';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import type { ModalProps } from 'antd';
import { Alert, Modal, Spin } from 'antd';
import * as React from 'react';

export interface UpdateCustomerModalProps extends ModalProps {
    customerId: string;
}

interface UseUpdateCustomerModalStateParams {
    customerId: string;
}

const useUpdateCustomerModalState = ({
    customerId,
}: UseUpdateCustomerModalStateParams) => {
    const customerQuery = useGetCustomerQuery(customerId);
    return { customerQuery };
};

export const UpdateCustomerModal: React.FC<UpdateCustomerModalProps> = ({
    customerId,
    ...props
}) => {
    const { customerQuery } = useUpdateCustomerModalState({ customerId });

    const content: React.ReactNode = (() => {
        if (customerQuery.isLoading) return <Spin />;

        if (!customerQuery.data)
            return (
                <Alert
                    type='error'
                    message={toClientErrorMessage(customerQuery.error)}
                />
            );

        return (
            <UpdateCusomterForm
                onCancel={props.onCancel}
                customer={customerQuery.data}
            />
        );
    })();

    return (
        <Modal {...props} footer={null}>
            {content}
        </Modal>
    );
};
