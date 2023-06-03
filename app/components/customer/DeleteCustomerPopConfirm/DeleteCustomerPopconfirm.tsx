import { useDeleteCustomerMutation } from '@lib/data-provider/services/customer';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import type { PopconfirmProps } from 'antd';
import { message, Popconfirm } from 'antd';
import * as React from 'react';

const useDeleteCustomerPopConfirmState = () => {
    const [deleteCustomer] = useDeleteCustomerMutation();

    const onDeleteCustomer = (customerId: string) => async () => {
        try {
            void message.loading(`Deleting customer with the id ${customerId}`);
            await deleteCustomer(customerId).unwrap();
            void message.success(`Customer deleted`);
        } catch (error) {
            void message.error(toClientErrorMessage(error));
        }
    };

    return {
        onDeleteCustomer,
    };
};

export interface DeleteCustomerPopConfirmProps
    extends Omit<PopconfirmProps, 'description' | 'title'> {
    customerId: string;
}

export const DeleteCustomerPopconfirm: React.FC<
    DeleteCustomerPopConfirmProps
> = ({ customerId, ...props }) => {
    const { onDeleteCustomer } = useDeleteCustomerPopConfirmState();

    return (
        <Popconfirm
            {...props}
            title='Delete the customer'
            description='Are you sure to delete this customer?'
            onConfirm={onDeleteCustomer(customerId)}
            okText='Yes'
            cancelText='No'
        />
    );
};
