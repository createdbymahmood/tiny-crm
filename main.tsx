import React from 'react';
import ReactDOM from 'react-dom/client';

import { Providers } from '@/app/general/components/providers';
import { Routes } from '@/lib/react-router/routes';

function render() {
    const element = ReactDOM.createRoot(document.getElementById('root')!);
    element.render(
        <React.StrictMode>
            <Providers>
                <Routes />
            </Providers>
        </React.StrictMode>,
    );
}

render();
