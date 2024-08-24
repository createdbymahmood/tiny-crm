import {lazyImport} from '@/utils/lazyImport';

const ViewCustomer = lazyImport(
    () => import('./ViewCustomer.page' /* webpackChunkName: "ViewCustomer" */),
    module => module.ViewCustomer,
);

export default ViewCustomer;
