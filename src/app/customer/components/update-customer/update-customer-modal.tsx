import type {ModalProps} from 'antd';
import {Alert, Modal} from 'antd';
import * as React from 'react';

import {UpdateCusomterForm} from '@/app/customer';
import {Pending} from '@/app/general';
import {useGetCustomerByIdQuery} from '@/lib/data-provider/services/api/api';
import {toClientErrorMessage} from '@/utils/to-client-error-message';

export interface UpdateCustomerModalProps extends ModalProps {
  customerId: string;
}

interface UseUpdateCustomerModalStateParams {
  customerId: string;
}

const useUpdateCustomerModalState = ({
  customerId,
}: UseUpdateCustomerModalStateParams) => {
  const customerQuery = useGetCustomerByIdQuery(customerId);
  return {customerQuery};
};

export const UpdateCustomerModal: React.FC<UpdateCustomerModalProps> = ({
  customerId,
  ...props
}) => {
  const {customerQuery} = useUpdateCustomerModalState({customerId});

  const content: React.ReactNode = (() => {
    if (customerQuery.isLoading) return <Pending />;

    if (!customerQuery.data)
      return (
        <Alert
          message={toClientErrorMessage(customerQuery.error)}
          type='error'
        />
      );

    return (
      <UpdateCusomterForm
        customer={customerQuery.data}
        onCancel={props.onCancel}
      />
    );
  })();

  return (
    <Modal {...props} footer={null}>
      {content}
    </Modal>
  );
};
