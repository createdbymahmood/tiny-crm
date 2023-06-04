import { CreateCustomerForm } from '@components/customer';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import * as React from 'react';

export interface CreateCustomerModalProps extends ModalProps {}

export const CreateCustomerModal: React.FC<
    CreateCustomerModalProps
> = props => {
    return (
        <Modal {...props} footer={null}>
            <CreateCustomerForm />
        </Modal>
    );
};
