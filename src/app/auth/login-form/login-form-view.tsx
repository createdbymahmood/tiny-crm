import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {Button, Form, Input, Typography} from 'antd';
import {createStyles} from 'antd-style';

const useLoginFormViewStyles = createStyles(({token, responsive}) => ({
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
    height: '100vh',

    [responsive.sm]: {
      height: 'auto',
    },
  },
  text: {
    color: token.colorTextSecondary,
  },
  title: {
    fontSize: token.fontSizeHeading3,

    [responsive.md]: {
      fontSize: token.fontSizeHeading2,
    },
  },
}));

interface LoginFormViewProps {
  isLoading: boolean;
}

const Logo = () => (
  <svg
    width='25'
    height='24'
    viewBox='0 0 25 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect x='0.464294' width='24' height='24' rx='4.8' fill='#1890FF' />
    <path d='M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z' fill='white' />
    <path d='M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z' fill='white' />
    <path d='M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z' fill='white' />
  </svg>
);

export const LoginFormView: React.FC<LoginFormViewProps> = ({isLoading}) => {
  const {styles} = useLoginFormViewStyles();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Logo />
          <Typography.Title className={styles.title}>Sign in</Typography.Title>
          <Typography.Text className={styles.text}>
            Welcome back to AntBlocks UI! Please enter your details below to
            sign in.
          </Typography.Text>
        </div>

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
      </div>
    </section>
  );
};
