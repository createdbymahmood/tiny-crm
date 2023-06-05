import { Providers } from '@components/providers';
import { Routes } from '@routes/routes';
import React from 'react';
import ReactDOM from 'react-dom/client';

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
