import { themeConfig } from '@lib/ant-design';
import { store } from '@lib/data-provider/store';
import { ConfigProvider, Spin } from 'antd';
import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { useStartMockServiceWorker } from './useStartMockServiceWorker';

export interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const { isLoading } = useStartMockServiceWorker();
    if (isLoading) return <Spin />;

    return (
        <Provider store={store}>
            <BrowserRouter>
                <ConfigProvider theme={themeConfig}>
                    <HelmetProvider>
                        <Helmet
                            defaultTitle='Customer Management'
                            titleTemplate='%s | Customer Management'
                        >
                            <meta
                                content='Customer Management'
                                name='description'
                            />
                        </Helmet>
                        {children}
                    </HelmetProvider>
                </ConfigProvider>
            </BrowserRouter>
        </Provider>
    );
};
