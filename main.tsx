import React from 'react';
import ReactDOM from 'react-dom/client';

import { Providers } from '@/app/general/components/providers';

function render() {
    const element = ReactDOM.createRoot(document.getElementById('root')!);
    element.render(
        <React.StrictMode>
            <Providers />
        </React.StrictMode>,
    );
}

render();
