import * as testIds from '@lib/cypress/testIds';
import { useGetCustomerQuery } from '@lib/data-provider/services/customer';
import { getTestAttributes } from '@utils/test/getTestAttributes';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import type { ModalProps } from 'antd';
import { Alert, Modal, Spin } from 'antd';
import { merge } from 'lodash';
import * as React from 'react';

interface UseViewCustomerModalStateParams {
    customerId: string;
}

const useViewCustomerModalState = ({
    customerId,
}: UseViewCustomerModalStateParams) => {
    const customerQuery = useGetCustomerQuery(customerId);
    return { customerId, customerQuery };
};

export interface ViewCustomerModalProps extends ModalProps {
    customerId: string;
}

const defaultModalProps: ModalProps = { footer: null };

export const ViewCustomerModal: React.FC<ViewCustomerModalProps> = ({
    customerId,
    ...props
}) => {
    const { customerQuery } = useViewCustomerModalState({ customerId });

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
