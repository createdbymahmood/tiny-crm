import {Form, message} from 'antd';
import type {Callbacks} from 'rc-field-form/lib/interface.d.ts';

import {mockUser} from '@/lib/data-provider/mock/handlers';
import type {LoginApiArg} from '@/lib/data-provider/services/__generated';
import {useLoginMutation} from '@/lib/data-provider/services/api';
import {toClientErrorMessage} from '@/utils/to-client-error-message';

import {LoginFormView} from './login-form-view';

const initialValues: LoginApiArg = mockUser;

export const LoginForm = () => {
  const [login, {isLoading}] = useLoginMutation();

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onFinish: Callbacks<LoginApiArg>['onFinish'] = async values => {
    try {
      await login(values).unwrap();
    } catch (error) {
      await message.error(toClientErrorMessage(error));
    }
  };

  return (
    <Form
      name='credentials-login'
      initialValues={initialValues}
      onFinish={onFinish}
      layout='vertical'
      requiredMark='optional'
    >
      <LoginFormView isLoading={isLoading} />
    </Form>
  );
};
