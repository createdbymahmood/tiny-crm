import type {EntityAdapter, EntityState} from '@reduxjs/toolkit';
import {setupWorker} from 'msw';

import type {Customer} from '@/lib/data-provider/services/__generated';

import {getHandlers} from './handlers';

export const getWorker = (
  state: EntityState<Customer>,
  adapter: EntityAdapter<Customer>,
) => setupWorker(...getHandlers(state, adapter));
