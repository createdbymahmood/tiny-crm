import '@/styles/global.css';

import {createRouter, RouterProvider} from '@tanstack/react-router';
import {ConfigProvider, Spin} from 'antd';
import * as React from 'react';
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {themeConfig} from '@/lib/ant-design';
import {useAppDispatch, useAppSelector} from '@/lib/data-provider/hooks';
import {useGetMeQuery} from '@/lib/data-provider/services/api/api';
import {persistor, store} from '@/lib/data-provider/store';
import {routeTree} from '@/routeTree.gen';

import {useStartMockServiceWorker} from './use-start-mock-service-worker';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    dispatch: undefined!,
    isAuth: undefined!,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const InnerApp = () => {
  const isAuthenticated = useAppSelector(s => s.auth.isAuthenticated);
  const isInitialized = useAppSelector(s => s.auth.isInitialized);
  const dispatch = useAppDispatch();
  const isAuth = isAuthenticated && isInitialized;
  const meQuery = useGetMeQuery();

  if (meQuery.isLoading) return <Spin />;

  return (
    <RouterProvider
      key={String(isAuth)}
      router={router}
      context={{isAuth, dispatch}}
    />
  );
};
export interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = () => {
  const {isLoading} = useStartMockServiceWorker();
  if (isLoading) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={themeConfig}>
          <HelmetProvider>
            <Helmet
              defaultTitle='Customer Management'
              titleTemplate='%s | Customer Management'
            >
              <meta content='Customer Management' name='description' />
            </Helmet>
            <InnerApp />
          </HelmetProvider>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};
