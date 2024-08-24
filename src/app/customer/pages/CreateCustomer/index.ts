import {lazyImport} from '@/utils/lazyImport';

const CreateCustomer = lazyImport(
    () =>
        import(
            './CreateCustomer.page' /* webpackChunkName: "CreateCustomer" */
        ),
    module => module.CreateCustomer,
);

export default CreateCustomer;
