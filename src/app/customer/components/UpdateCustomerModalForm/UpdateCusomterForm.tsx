import type {
    CreateCustomerFormPayload as UpdateCustomerFormPayload,
    FormCancelHandle,
} from '@app/customer';
import {
    createCustomerDtoTransformer,
    CreateCustomerFormView as UpdateCustomerFormView,
} from '@app/customer';
import * as testIds from '@lib/cypress/testIds';
import { useUpdateCustomerMutation } from '@lib/data-provider/services/customer';
import type { Customer } from '@lib/data-provider/services/customer/customer.types';
import { deepObjectTransformer } from '@utils/deepObjectTransformer';
import { getTestAttributes } from '@utils/test/getTestAttributes';
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

/**
 *
 * @param customer  Customer object
 * @returns maps øver all of the properties of the customer object
 * to ensure all of date values are transformed into dayjs instances to be able to be used in the form's datepicker.
 */
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
            draft.projects = createCustomerDtoTransformer(draft.projects);
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
            {...getTestAttributes(testIds.createOrUpdateCustomer.form.update)}
        >
            <UpdateCustomerFormView onCancel={onCancel} isLoading={isLoading} />
        </Form>
    );
};
