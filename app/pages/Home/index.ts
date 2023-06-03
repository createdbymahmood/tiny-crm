import { lazyImport } from '@utils/lazyImport';

const Dashboard = lazyImport(
    () => import('./Home.page' /* webpackChunkName: "HomePage" */),
    module => module.Home,
);

export default Dashboard;
