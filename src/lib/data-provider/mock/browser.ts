import type { EntityAdapter, EntityState } from '@reduxjs/toolkit';
import { setupWorker } from 'msw/browser';

import type { Customer } from '@/lib/data-provider/services/customer/customer.types';

import { getHandlers } from './handlers';

export const getWorker = (
    state: EntityState<Customer>,
    adapter: EntityAdapter<Customer>,
) => setupWorker(...getHandlers(state, adapter));
