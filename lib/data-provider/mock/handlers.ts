import { createEntityAdapter } from '@reduxjs/toolkit';
import { rest } from 'msw';

import type { Customer } from '../services/customer';

const adapter = createEntityAdapter<Customer>();

// eslint-disable-next-line fp/no-let, import/no-mutable-exports
let state = adapter.getInitialState();
state = adapter.setAll(state, [
    { id: 1, name: 'A sample customer', fetched_at: new Date().toUTCString() },
    {
        id: 2,
        name: 'A customer about rtk-query',
        fetched_at: new Date().toUTCString(),
    },
]);

export { state };

export const handlers = [
    rest.get('/customers/:id', (req, res, ctx) => {
        const { id } = req.params as { id: string };
        state = adapter.updateOne(state, {
            id,
            changes: { fetched_at: new Date().toUTCString() },
        });
        return res(ctx.json(state.entities[id]), ctx.delay(400));
    }),
    rest.get('/customers', (_req, res, ctx) => {
        return res(ctx.json(Object.values(state.entities)));
    }),
];
