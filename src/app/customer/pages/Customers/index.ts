import { lazyImport } from '@/utils/lazyImport';

const Customers = lazyImport(
    () => import('./Customers.page' /* webpackChunkName: "Customers" */),
    module => module.Customers,
);

export default Customers;
