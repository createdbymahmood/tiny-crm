import React from 'react';
import ReactDOM from 'react-dom/client';

import {Providers} from '@/app/general/components/providers';

function render(root: ReactDOM.Root) {
  root.render(
    <React.StrictMode>
      <Providers />
    </React.StrictMode>,
  );
}

const targetElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(targetElement);

render(root);
