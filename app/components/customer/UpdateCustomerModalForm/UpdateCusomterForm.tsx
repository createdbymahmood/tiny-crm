import { createCustomerDtoTransformer as updateCustomerDtoTransformer } from '@components/customer';
import type {
    CreateCustomerFormPayload as UpdateCustomerFormPayload,
    FormCancelHandle,
} from '@components/customer/CreateCustomerModalForm/CreateCustomerForm.types';
import { CreateCustomerFormView as UpdateCustomerFormView } from '@components/customer/CreateCustomerModalForm/CreateCustomerFormView';
import { useUpdateCustomerMutation } from '@lib/data-provider/services/customer';
import type { Customer } from '@lib/data-provider/services/customer/customer.types';
import { deepObjectTransformer } from '@utils/deepObjectTransformer';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import { Form, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayJS from 'dayjs';
import { produce } from 'immer';
import { isString, noop } from 'lodash';
import * as React from 'react';

export interface UpdateCusomterFormProps {
    onCancel?: FormCancelHandle;
    customer: Customer;
}

const transformCustomerToEditableFormValues = (customer: Customer) => {
    return deepObjectTransformer({
        obj: customer,
        predicate: value => {
            try {
                return isString(value) && dayJS(value).isValid();
            } catch (error) {
                return false;
            }
        },
        transformer: value => {
            return dayJS(value);
        },
    });
};

export const UpdateCusomterForm: React.FC<UpdateCusomterFormProps> = ({
    onCancel = noop,
    customer,
}) => {
    /*  */
    const [form] = useForm<UpdateCustomerFormPayload>();

    const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();

    const onSubmit = async (newCustomer: UpdateCustomerFormPayload) => {
        const data = produce(newCustomer, draft => {
            draft.projects = updateCustomerDtoTransformer(draft.projects);
        });

        try {
            void message.loading('Updating customer...');
            await updateCustomer({ ...data, id: customer.id }).unwrap();
            void message.success('Customer updated successfully!');
            /* Closing modal... */
            onCancel();
        } catch (error) {
            void message.error(toClientErrorMessage(error));
        }
    };

    return (
        <Form
            form={form}
            onFinish={onSubmit}
            layout='vertical'
            initialValues={transformCustomerToEditableFormValues(customer)}
        >
            <UpdateCustomerFormView onCancel={onCancel} isLoading={isLoading} />
        </Form>
    );
};
