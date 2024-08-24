import {lazyImport} from '@/utils/lazy-import';

const CreateCustomer = lazyImport(
    () =>
        import(
            './create-customer.page' /* webpackChunkName: "CreateCustomer" */
        ),
    module => module.CreateCustomer,
);

export default CreateCustomer;
