import {
    useDeleteCustomerMutation,
    useGetCustomersQuery,
    useUpdateCustomerMutation,
} from '@lib/data-provider/services/customer';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import { Alert, Button, message, Space, Spin } from 'antd';
import * as React from 'react';

export const Home: React.FC = () => {
    const { data = [], isLoading, error } = useGetCustomersQuery();
    const [
        deleteCustomer,
        { isLoading: isDeletingCustomer, originalArgs: toDeleteCustomerId },
    ] = useDeleteCustomerMutation();
    const [
        updateCustomer,
        { isLoading: isUpdatingCustomer, originalArgs: toUpdateCustomerId },
    ] = useUpdateCustomerMutation();

    if (isLoading) return <Spin />;
    if (error)
        return <Alert message={toClientErrorMessage(error)} type='error' />;

    const onDeleteCustomer = (customerId: string) => async () => {
        try {
            void message.loading(`deleting customer with Id ${customerId}`);
            await deleteCustomer(customerId).unwrap();
            void message.success('Customer deleted successfully');
        } catch (err) {
            void message.error(toClientErrorMessage(err));
        }
    };

    const onUpdateCustomer = (customerId: string) => async () => {
        try {
            void message.loading(`deleting customer with Id ${customerId}`);
            await updateCustomer({
                id: customerId,
                about: 'Some random about',
            }).unwrap();
            void message.success('Customer deleted successfully');
        } catch (err) {
            void message.error(toClientErrorMessage(err));
        }
    };

    return (
        <React.Fragment>
            {data.map(customer => {
                const _isLoading = isDeletingCustomer
                    ? toDeleteCustomerId === customer.id
                    : false;
                return (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <Space key={customer.id} size='large'>
                        {customer.about}

                        <Button
                            onClick={onDeleteCustomer(customer.id)}
                            loading={_isLoading}
                            type='primary'
                            danger
                        >
                            Update Customer
                        </Button>
                    </Space>
                );
            })}
        </React.Fragment>
    );
};
