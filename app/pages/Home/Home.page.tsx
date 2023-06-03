import { useGetCustomerQuery } from '@lib/data-provider/services/customer';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import { Alert, Spin } from 'antd';
import * as React from 'react';

export const Home: React.FC = () => {
    const { data, isLoading, error } = useGetCustomerQuery(
        '40c0bad7-f1a6-4173-bd44-7ebef04as4905d',
    );

    if (isLoading) return <Spin />;
    if (error)
        return <Alert message={toClientErrorMessage(error)} type='error' />;

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
