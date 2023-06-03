import { MOCK_API_CALL_REQUEST_DELAY } from '@configs/constants';
import { urls } from '@lib/data-provider/mock/urls';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { find } from 'lodash';
import { rest } from 'msw';

import type { Customer } from '../services/customer/customer.types.d';
// eslint-disable-next-line import/extensions
import customers from './customers.json';

const adapter = createEntityAdapter<Customer>();

// eslint-disable-next-line fp/no-let, import/no-mutable-exports
let state = adapter.getInitialState();
state = adapter.setAll(state, customers);

export { state };

export const handlers = [
    rest.get(urls.customer, (req, res, ctx) => {
        const { id } = req.params as { id: string };
        const customer = find(state.entities, { id });

        if (!customer) {
            return res(
                ctx.status(404),
                ctx.json({
                    message: `Customer with id ${id} not found`,
                }),
            );
        }

        return res(ctx.json(customer), ctx.delay(MOCK_API_CALL_REQUEST_DELAY));
    }),

    rest.get(urls.customers, (_req, res, ctx) => {
        return res(
            ctx.json(Object.values(state.entities)),
            ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
        );
    }),

    rest.put(urls.customer, async (req, res, ctx) => {
        const { id } = req.params as { id: string };
        const changes = await req.json();
        const customer = find(state.entities, { id });

        if (!customer) {
            return res(
                ctx.status(MOCK_API_CALL_REQUEST_DELAY),
                ctx.json({
                    message: `Customer with id ${id} not found`,
                }),
                ctx.delay(),
            );
        }

        state = adapter.updateOne(state, { id, changes });
        return res(
            ctx.json(state.entities[id]),
            ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
        );
    }),

    rest.delete(urls.customer, (req, res, ctx) => {
        const { id } = req.params as { id: string };

        const customer = find(state.entities, { id });

        if (!customer) {
            return res(
                ctx.json({
                    message: `Customer with id ${id} not found`,
                }),
                ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
                ctx.status(404),
            );
        }

        state = adapter.removeOne(state, id);

        return res(
            ctx.json({
                id,
                success: true,
            }),
            ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
        );
    }),
];
