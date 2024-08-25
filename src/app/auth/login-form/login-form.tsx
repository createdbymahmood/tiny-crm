import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {Button, Form, Grid, Input, message, theme, Typography} from 'antd';

import {mockUser} from '@/lib/data-provider/mock/handlers';
import {useLoginMutation} from '@/lib/data-provider/services/api';
import {toClientErrorMessage} from '@/utils/to-client-error-message';

const {useToken} = theme;
const {useBreakpoint} = Grid;
const {Text, Title} = Typography;

export const LoginForm = () => {
  const {token} = useToken();
  const screens = useBreakpoint();
  const [login, {isLoading}] = useLoginMutation();

  const onFinish = async values => {
    console.log('Received values of form: ', values);

    try {
      await login(values).unwrap();
    } catch (error) {
      void message.error(toClientErrorMessage(error));
    }
  };

  const styles = {
    container: {
      margin: '0 auto',
      padding: `${token.sizeXXL}px ${token.padding}px`,
      width: '380px',
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: 'center',
      width: '100%',
    },
    forgotPassword: {
      float: 'right',
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      alignItems: 'center',
      backgroundColor: token.colorBgContainer,
      display: 'flex',
      height: screens.sm ? '100vh' : 'auto',
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <svg
            width='25'
            height='24'
            viewBox='0 0 25 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect x='0.464294' width='24' height='24' rx='4.8' fill='#1890FF' />
            <path
              d='M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z'
              fill='white'
            />
            <path
              d='M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z'
              fill='white'
            />
            <path
              d='M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z'
              fill='white'
            />
          </svg>

          <Title style={styles.title}>Sign in</Title>
          <Text style={styles.text}>
            Welcome back to AntBlocks UI! Please enter your details below to
            sign in.
          </Text>
        </div>
        <Form
          name='credentials-login'
          initialValues={{
            remember: true,
            ...mockUser,
          }}
          onFinish={onFinish}
          layout='vertical'
          requiredMark='optional'
        >
          <Form.Item
            name='username'
            rules={[
              {
                type: 'string',
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item style={{marginBottom: '0px'}}>
            <Button loading={isLoading} block type='primary' htmlType='submit'>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
