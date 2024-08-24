import {lazyImport} from '@/utils/lazy-import';

const ViewCustomer = lazyImport(
  () => import('./view-customer.page' /* webpackChunkName: "ViewCustomer" */),
  module => module.ViewCustomer,
);

export default ViewCustomer;
