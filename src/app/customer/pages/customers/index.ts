import {lazyImport} from '@/utils/lazyImport';

const Customers = lazyImport(
    () => import('./customers.page' /* webpackChunkName: "Customers" */),
    module => module.Customers,
);

export default Customers;
