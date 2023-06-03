import { themeConfig } from '@lib/ant-design';
import { worker } from '@lib/data-provider/mock/browser';
import { store } from '@lib/data-provider/store';
import { Routes } from '@routes/routes';
import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

async function render() {
    await worker.start();

    const element = ReactDOM.createRoot(document.getElementById('root')!);
    element.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <ConfigProvider theme={themeConfig}>
                        <Routes />
                    </ConfigProvider>
                </BrowserRouter>
            </Provider>
        </React.StrictMode>,
    );
}

void render();
