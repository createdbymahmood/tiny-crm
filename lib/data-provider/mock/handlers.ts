import { MOCK_API_CALL_REQUEST_DELAY } from '@configs/constants';
import { urls } from '@lib/data-provider/mock/urls';
import type { EntityAdapter, EntityState } from '@reduxjs/toolkit';
import { each, find } from 'lodash';
import { rest } from 'msw';
import { v4 as uuid } from 'uuid';

import type { Customer } from '../services/customer/customer.types.d';

export const getHandlers = (
    state: EntityState<Customer>,
    adapter: EntityAdapter<Customer>,
) => [
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

    rest.post(urls.deleteCustomers, async (req, res, ctx) => {
        const { ids } = await req.json();
        const customers = ids
            .map(id => find(state.entities, { id }))
            .filter(Boolean);

        if (!customers.length) {
            return res(
                ctx.json({
                    message: `No customers found with specified ids`,
                }),
                ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
                ctx.status(404),
            );
        }

        state = adapter.removeMany(state, ids);

        return res(
            ctx.json({
                ids,
                success: true,
            }),
            ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
        );
    }),

    rest.post(urls.customers, async (req, res, ctx) => {
        const customer: Customer = await req.json();

        each(customer.projects, project => {
            project.id = uuid();
        });

        state = adapter.addOne(state, { ...customer, id: uuid() } as Customer);
        return res(
            ctx.json(Object.values(state.entities)),
            ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
        );
    }),
];
