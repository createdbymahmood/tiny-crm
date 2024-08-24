/**
 *
 * CreateCustomer
 *
 */
import {Form, message} from 'antd';
import {useForm} from 'antd/es/form/Form';
import {produce} from 'immer';
import {noop} from 'lodash';
import {pipe} from 'lodash/fp';
import * as React from 'react';

import * as testIds from '@/lib/cypress/testIds';
import {useCreateCustomerMutation} from '@/lib/data-provider/services/api';
import {getTestAttributes} from '@/utils/test/get-test-attributes';
import {toClientErrorMessage} from '@/utils/to-client-error-message';
import {transformAllDayjsInstancesToIso8601FormattedValue} from '@/utils/transform-all-dayjs-instances-to-iso8601-formatted-value';
import {transformEmptyValuesToNull} from '@/utils/transform-empty-values-to-null';

import type {
  CreateCustomerFormPayload,
  FormCancelHandle,
} from './create-customer-form.types';
import {CreateCustomerFormView} from './create-customer-form-view';

interface CreateCustomerFormProps {
  onCancel?: FormCancelHandle;
}

export const transformCustomerFormValuesToDTO = pipe(
  transformAllDayjsInstancesToIso8601FormattedValue,
  transformEmptyValuesToNull,
);

export const CreateCustomerForm: React.FC<CreateCustomerFormProps> = ({
  onCancel = noop,
}) => {
  /*  */
  const [form] = useForm<CreateCustomerFormPayload>();

  const [createCustomer, {isLoading}] = useCreateCustomerMutation();

  const onSubmit = async (newCustomer: CreateCustomerFormPayload) => {
    const data = produce(newCustomer, draft => {
      draft.projects = transformCustomerFormValuesToDTO(draft.projects);
    });

    try {
      void message.loading('Creating customer...');
      await createCustomer(data).unwrap();
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
      initialValues={
        {
          isActive: true,
          projects: [{}],
        } as CreateCustomerFormPayload
      }
      layout='vertical'
      onFinish={onSubmit}
      {...getTestAttributes(testIds.createOrUpdateCustomer.form.create)}
    >
      <CreateCustomerFormView isLoading={isLoading} onCancel={onCancel} />
    </Form>
  );
};
