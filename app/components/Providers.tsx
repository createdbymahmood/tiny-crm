import { themeConfig } from '@lib/ant-design';
import { worker } from '@lib/data-provider/mock/browser';
import { store } from '@lib/data-provider/store';
import { ConfigProvider, Spin } from 'antd';
import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export interface ProvidersProps {
    children: React.ReactNode;
}

const useStartMockServiceWorker = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        void (async () => {
            await worker.start();
            setIsLoading(false);
        })();
    }, []);

    return { isLoading };
};

export const Providers = ({ children }) => {
    const { isLoading } = useStartMockServiceWorker();
    if (isLoading) return <Spin />;
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ConfigProvider theme={themeConfig}>
                    <HelmetProvider>
                        <Helmet
                            titleTemplate='%s | Parloa Customer Management'
                            defaultTitle='Parloa Customer Management'
                        >
                            <meta
                                name='description'
                                content='Parloa Customer Management'
                            />
                        </Helmet>
                        {children}
                    </HelmetProvider>
                </ConfigProvider>
            </BrowserRouter>
        </Provider>
    );
};
