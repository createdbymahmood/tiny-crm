import {createRouter, RouterProvider} from '@tanstack/react-router';
import {ConfigProvider, Spin} from 'antd';
import * as React from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';

import {themeConfig} from '@/lib/ant-design';
import {store} from '@/lib/data-provider/store';
import {routeTree} from '@/routeTree.gen';

import {useStartMockServiceWorker} from './use-start-mock-service-worker';

// Create a new router instance
const router = createRouter({routeTree});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = () => {
  const {isLoading} = useStartMockServiceWorker();
  if (isLoading) return <Spin />;

  return (
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <HelmetProvider>
          <Helmet
            defaultTitle='Customer Management'
            titleTemplate='%s | Customer Management'
          >
            <meta content='Customer Management' name='description' />
          </Helmet>
          <RouterProvider router={router} />
        </HelmetProvider>
      </ConfigProvider>
    </Provider>
  );
};
