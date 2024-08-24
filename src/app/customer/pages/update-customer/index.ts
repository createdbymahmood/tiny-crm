import {lazyImport} from '@/utils/lazy-import';

const UpdateCustomer = lazyImport(
  () =>
    import('./update-customer.page' /* webpackChunkName: "UpdateCustomer" */),
  module => module.UpdateCustomer,
);

export default UpdateCustomer;
