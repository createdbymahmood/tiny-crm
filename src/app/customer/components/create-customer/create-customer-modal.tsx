import type {ModalProps} from 'antd';
import {Modal} from 'antd';
import * as React from 'react';

import {CreateCustomerForm} from './create-customer-form/create-customer-form';

export interface CreateCustomerModalProps extends ModalProps {}

export const CreateCustomerModal: React.FC<
  CreateCustomerModalProps
> = props => {
  return (
    <Modal {...props} footer={null}>
      <CreateCustomerForm onCancel={props.onCancel} />
    </Modal>
  );
};
