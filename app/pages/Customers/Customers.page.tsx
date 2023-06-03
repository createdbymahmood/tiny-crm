import { DeleteCustomerPopconfirm } from '@components/customer';
import { Container } from '@components/design-system';
import {
    useDeleteCustomerMutation,
    useGetCustomersQuery,
    useUpdateCustomerMutation,
} from '@lib/data-provider/services/customer';
import { createRoute } from '@routes/createRoute';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import { Alert, Button, Col, message, Row, Space, Spin } from 'antd';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from 'react-router-dom';

export const Customers: React.FC = () => {
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
        <Container>
            <Helmet title='Customers' />
            <Row>
                {data.map(customer => {
                    const _isLoading = isDeletingCustomer
                        ? toDeleteCustomerId === customer.id
                        : false;
                    return (
                        <Col sm={12} key={customer.id}>
                            <Space size='large'>
                                <Link
                                    to={createRoute('customers.view', {
                                        id: customer.id,
                                    })}
                                >
                                    {customer.company}
                                </Link>
                                <Button
                                    onClick={onDeleteCustomer(customer.id)}
                                    loading={_isLoading}
                                    type='primary'
                                >
                                    Update Customer
                                </Button>

                                <DeleteCustomerPopconfirm
                                    customerId={customer.id}
                                >
                                    <Button type='primary' danger>
                                        Delete Customer
                                    </Button>
                                </DeleteCustomerPopconfirm>
                            </Space>
                        </Col>
                    );
                })}
            </Row>
            <Outlet />
        </Container>
    );
};
