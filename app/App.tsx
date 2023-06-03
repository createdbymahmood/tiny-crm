import { themeConfig } from '@lib/ant-design';
import { ConfigProvider } from 'antd';
import * as React from 'react';
import { useRoutes } from 'react-router-dom';

import { routes } from './routes';

const App: React.FC = () => {
    const content = useRoutes(routes);

    return <ConfigProvider theme={themeConfig}>{content}</ConfigProvider>;
};

export default App;
