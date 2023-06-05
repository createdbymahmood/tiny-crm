import * as testIds from '@lib/cypress/testIds';
import { useGetCustomerQuery } from '@lib/data-provider/services/customer';
import { getTestAttributes } from '@utils/test/getTestAttributes';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import type { ModalProps } from 'antd';
import { Alert, Modal, Spin } from 'antd';
import { merge } from 'lodash';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const useViewCustomerModalState = () => {
    const customerId = useParams().id!;
    const customerQuery = useGetCustomerQuery(customerId);
    return { customerId, customerQuery };
};

export interface ViewCustomerModalProps extends ModalProps {}

const defaultModalProps: ModalProps = { footer: null };

export const ViewCustomerModal: React.FC<ViewCustomerModalProps> = props => {
    const { customerQuery } = useViewCustomerModalState();

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
            <div
                {...getTestAttributes(
                    testIds.viewCustomer.content(customerQuery.data.id),
                )}
            >
                {JSON.stringify(customerQuery.data)}
            </div>
        );
    })();

    return <Modal {...merge(defaultModalProps, props)}>{content}</Modal>;
};
