/**
 *
 * CreateCustomer
 *
 */
import { useCreateCustomerMutation } from '@lib/data-provider/services/customer';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { noop } from 'lodash';
import type { Callbacks } from 'rc-field-form/lib/interface';
import * as React from 'react';

import type {
    CreateCustomerFormPayload,
    FormCancelHandle,
} from './CreateCustomerForm.types';
import { CreateCustomerFormView } from './CreateCustomerFormView';

interface CreateCustomerFormProps {
    onCancel?: FormCancelHandle;
}

export const CreateCustomerForm: React.FC<CreateCustomerFormProps> = ({
    onCancel = noop,
}) => {
    /*  */
    const [form] = useForm<CreateCustomerFormPayload>();

    const [createCustomer, result] = useCreateCustomerMutation();

    const onSubmit: Callbacks<CreateCustomerFormPayload>['onFinish'] =
        values => {
            console.log(values);
        };

    return (
        <Form
            form={form}
            onFinish={onSubmit}
            layout='vertical'
            initialValues={
                {
                    isActive: true,
                    projects: [{ name: 'Some Cool AI project' }],
                } as CreateCustomerFormPayload
            }
        >
            <CreateCustomerFormView result={result} onCancel={onCancel} />
        </Form>
    );
};
