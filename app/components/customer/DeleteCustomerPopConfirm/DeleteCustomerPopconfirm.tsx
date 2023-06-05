import * as testIds from '@lib/cypress/testIds';
import { useDeleteCustomersMutation } from '@lib/data-provider/services/customer';
import { getTestAttributes } from '@utils/test/getTestAttributes';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import type { PopconfirmProps } from 'antd';
import { message, Popconfirm } from 'antd';
import { head } from 'lodash';
import * as React from 'react';

const useDeleteCustomerPopConfirmState = () => {
    const [deleteCustomers] = useDeleteCustomersMutation();

    const onDeleteCustomer = (customerIds: string[]) => async () => {
        try {
            void message.loading(`Deleting customer(s)`);
            await deleteCustomers(customerIds).unwrap();
            void message.success(`Customer(s) deleted`);
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
    customerIds: string[];
}

export const DeleteCustomerPopconfirm: React.FC<
    DeleteCustomerPopConfirmProps
> = ({ customerIds, onConfirm, ...props }) => {
    const { onDeleteCustomer } = useDeleteCustomerPopConfirmState();

    return (
        <Popconfirm
            {...props}
            placement='topRight'
            title='Delete customer(s)'
            description='Are you sure to delete selected customer(s)?'
            onConfirm={onDeleteCustomer(customerIds)}
            okText='Yes'
            cancelText='No'
            okButtonProps={getTestAttributes(
                testIds.deleteCustomer.cta(head(customerIds)!),
            )}
        />
    );
};
