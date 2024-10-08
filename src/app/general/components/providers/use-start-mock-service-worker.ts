import {env} from '@configs/env';
import {createEntityAdapter} from '@reduxjs/toolkit';
import * as React from 'react';

import {getWorker} from '@/lib/data-provider/mock/browser';
import customersMock from '@/lib/data-provider/mock/customers.json';
import type {Customer} from '@/lib/data-provider/services/api/__generated';

export const useStartMockServiceWorker = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const setupMockServiceWorker = React.useCallback(async () => {
    const adapter = createEntityAdapter<Customer>();
    // eslint-disable-next-line fp/no-let
    let state = adapter.getInitialState();

    try {
      const response = await fetch(env.JsonMockUrl);
      const customers = await response.json();
      state = adapter.setAll(state, customers);
    } catch (error) {
      state = adapter.setAll(state, customersMock);
    }
    await getWorker(state, adapter).start();

    setIsLoading(false);
  }, []);

  React.useEffect(
    () => void setupMockServiceWorker(),
    [setupMockServiceWorker],
  );

  return {isLoading};
};
