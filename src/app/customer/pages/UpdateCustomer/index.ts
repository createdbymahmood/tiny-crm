import {lazyImport} from '@/utils/lazyImport';

const UpdateCustomer = lazyImport(
    () =>
        import(
            './UpdateCustomer.page' /* webpackChunkName: "UpdateCustomer" */
        ),
    module => module.UpdateCustomer,
);

export default UpdateCustomer;
