/**
 *
 * CreateCustomer
 *
 */
import { useCreateCustomerMutation } from '@lib/data-provider/services/customer';
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import type { Callbacks } from 'rc-field-form/lib/interface';

import type { CreateCustomerFormPayload } from './CreateCustomerForm.types';
import { CreateCustomerFormView } from './CreateCustomerFormView';

export const CreateCustomerForm = () => {
    /*  */
    const [form] = useForm<CreateCustomerFormPayload>();

    const [createCustomer, result] = useCreateCustomerMutation();

    const onSubmit: Callbacks<CreateCustomerFormPayload>['onFinish'] =
        values => {
            console.log('LOG');
        };

    return (
        <Form form={form} onFinish={onSubmit} layout='vertical'>
            <CreateCustomerFormView result={result} />
        </Form>
    );
};
