import { themeConfig } from '@lib/ant-design';
import { ConfigProvider } from 'antd';
import * as React from 'react';

const App: React.FC = () => {
    return <ConfigProvider theme={themeConfig} />;
};

export default App;
