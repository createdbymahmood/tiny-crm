import {lazyImport} from '@/utils/lazy-import';

const Login = lazyImport(
  () => import('./login.page' /* webpackChunkName: "Login" */),
  module => module.Login,
);

export default Login;
