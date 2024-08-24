import type { EntityAdapter, EntityState } from '@reduxjs/toolkit';
import { setupWorker } from 'msw';

import { getHandlers } from './handlers';
import { Customer } from '@/lib/data-provider/services/__generated';

export const getWorker = (
    state: EntityState<Customer>,
    adapter: EntityAdapter<Customer>,
) => setupWorker(...getHandlers(state, adapter));
