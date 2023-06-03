import { lazyImport } from '@utils/lazyImport';

const CreateCustomer = lazyImport(
    () => import('./CreateCustomer' /* webpackChunkName: "CreateCustomer" */),
    module => module.CreateCustomer,
);

export default CreateCustomer;
