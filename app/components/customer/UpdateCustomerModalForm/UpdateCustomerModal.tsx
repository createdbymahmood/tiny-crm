import { UpdateCusomterForm } from '@components/customer/UpdateCustomerModalForm/UpdateCusomterForm';
import { useGetCustomerQuery } from '@lib/data-provider/services/customer';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import type { ModalProps } from 'antd';
import { Alert, Modal, Spin } from 'antd';
import * as React from 'react';
import { useParams } from 'react-router-dom';

export interface UpdateCustomerModalProps extends ModalProps {}

const useUpdateCustomerModalState = () => {
    const customerId = useParams().id!;
    const customerQuery = useGetCustomerQuery(customerId);
    return { customerQuery };
};

export const UpdateCustomerModal: React.FC<
    UpdateCustomerModalProps
> = props => {
    const { customerQuery } = useUpdateCustomerModalState();

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
