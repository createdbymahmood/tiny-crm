import { MOCK_API_CALL_REQUEST_DELAY } from '@configs/constants';
import type { EntityAdapter, EntityState } from '@reduxjs/toolkit';
import { each, find } from 'lodash';
import type { StrictResponse } from 'msw';
import { delay, http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';

import { urls } from '@/lib/data-provider/mock/urls';

import type { Customer } from '../services/customer/customer.types.d';

type Response = StrictResponse<{ message: string }>;
export const getHandlers = (
    state: EntityState<Customer>,
    adapter: EntityAdapter<Customer>,
) => [
    http.get(urls.customer, async ({ params }) => {
        const { id } = params as { id: string };
        const customer = find(state.entities, { id });

        if (!customer) {
            return HttpResponse.json(
                { message: `Customer with id ${id} not found` },
                { status: 404 },
            );
        }

        await delay(MOCK_API_CALL_REQUEST_DELAY);
        return HttpResponse.json(customer) as unknown as Response;
    }),

    http.get(urls.customers, async () => {
        await delay(MOCK_API_CALL_REQUEST_DELAY);
        return HttpResponse.json(Object.values(state.entities));
    }),

    http.put(urls.customer, async ({ params, request }) => {
        const { id } = params as { id: string };
        const changes = (await request.json()) as Customer;
        const customer = find(state.entities, { id });

        await delay(MOCK_API_CALL_REQUEST_DELAY);

        if (!customer) {
            return HttpResponse.json(
                { message: `Customer with id ${id} not found` },
                { status: 404 },
            );
        }

        state = adapter.updateOne(state, { id, changes });
        return HttpResponse.json(state.entities[id]) as unknown as Response;
    }),

    http.post(urls.deleteCustomers, async ({ request }) => {
        const { ids } = (await request.json()) as { ids: string[] };
        const customers = ids
            .map(id => find(state.entities, { id }))
            .filter(Boolean);

        await delay(MOCK_API_CALL_REQUEST_DELAY);

        if (!customers.length) {
            return HttpResponse.json(
                {
                    message: `No customers found with specified ids`,
                },
                { status: 404 },
            );
        }

        state = adapter.removeMany(state, ids);
        return HttpResponse.json({ ids }) as unknown as Response;
    }),

    http.post(urls.customers, async ({ request }) => {
        const customer = (await request.json()) as Customer;

        each(customer.projects, project => {
            project.id = uuid();
        });

        state = adapter.addOne(state, { ...customer, id: uuid() } as Customer);
        await delay(MOCK_API_CALL_REQUEST_DELAY);

        return HttpResponse.json(Object.values(state.entities));
    }),
];
