import {lazyImport} from '@/utils/lazy-import';

const Customers = lazyImport(
  () => import('./customers.page' /* webpackChunkName: "Customers" */),
  module => module.Customers,
);

export default Customers;
