/**
 *
 * CreateCustomer
 *
 */
import { useCreateCustomerMutation } from '@lib/data-provider/services/customer';
import { toClientErrorMessage } from '@utils/toClientErrorMessage';
import { transformAllDayjsInstancesToIso8601FormattedValue } from '@utils/transformAllDayjsInstancesToIso8601FormattedValue';
import { transformEmptyValuesToNull } from '@utils/transformEmptyValuesToNull';
import { Form, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { produce } from 'immer';
import { noop } from 'lodash';
import { pipe } from 'lodash/fp';
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

const createCustomerDtoTransformer = pipe(
    transformAllDayjsInstancesToIso8601FormattedValue,
    transformEmptyValuesToNull,
);

export const CreateCustomerForm: React.FC<CreateCustomerFormProps> = ({
    onCancel = noop,
}) => {
    /*  */
    const [form] = useForm<CreateCustomerFormPayload>();

    const [createCustomer, { isLoading }] = useCreateCustomerMutation();

    const onSubmit = async (newCustomer: CreateCustomerFormPayload) => {
        const data = produce(newCustomer, draft => {
            draft.projects = createCustomerDtoTransformer(draft.projects);
        });

        try {
            void message.loading('Creating customer...');
            await createCustomer(data);
            void message.success('Customer created successfully!');
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
            initialValues={
                {
                    isActive: true,
                    projects: [{ name: 'Some Cool AI project' }],
                } as CreateCustomerFormPayload
            }
        >
            <CreateCustomerFormView onCancel={onCancel} isLoading={isLoading} />
        </Form>
    );
};
