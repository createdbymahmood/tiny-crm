import {MOCK_API_CALL_REQUEST_DELAY} from '@configs/constants';
import {env} from '@configs/env';
import type {EntityAdapter, EntityState} from '@reduxjs/toolkit';
import * as jose from 'jose'; // Import jsonwebtoken
import {each, find, isEqual} from 'lodash';
import {rest} from 'msw';
import {v4 as uuid} from 'uuid';

import type {Customer} from '@/lib/data-provider/services/__generated';

export const mockUser = {
  username: 'admin',
  password: 'U1oP0oSUQyUGDY',
};

const secret = new TextEncoder().encode(env.JWTKey);
const alg = 'HS256';

// eslint-disable-next-line max-lines-per-function
export const getHandlers = (
  state: EntityState<Customer>,
  adapter: EntityAdapter<Customer>,
) => [
  rest.get('/customers/:id', (req, res, ctx) => {
    const {id} = req.params as {id: string};
    const customer = find(state.entities, {id});

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

  rest.get('/customers', (_req, res, ctx) => {
    return res(
      ctx.json(Object.values(state.entities)),
      ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
    );
  }),

  rest.put('/customers/:id', async (req, res, ctx) => {
    const {id} = req.params as {id: string};
    const changes = await req.json();
    const customer = find(state.entities, {id});

    if (!customer) {
      return res(
        ctx.status(MOCK_API_CALL_REQUEST_DELAY),
        ctx.json({
          message: `Customer with id ${id} not found`,
        }),
        ctx.delay(),
      );
    }

    state = adapter.updateOne(state, {id, changes});
    return res(
      ctx.json(state.entities[id]),
      ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
    );
  }),

  rest.post('/deleteCustomers', async (req, res, ctx) => {
    const ids = await req.json();
    const customers = ids.map(id => find(state.entities, {id})).filter(Boolean);

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

  rest.post('/customers', async (req, res, ctx) => {
    const customer: Customer = await req.json();

    each(customer.projects, project => {
      project.id = uuid();
    });

    state = adapter.addOne(state, {...customer, id: uuid()} as Customer);
    return res(
      ctx.json(Object.values(state.entities)),
      ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
    );
  }),

  rest.post('/login', async (req, res, ctx) => {
    const credentials = await req.json();

    if (isEqual(credentials, mockUser)) {
      const token = await new jose.SignJWT({username: mockUser.username})
        .setProtectedHeader({alg})
        .sign(secret);

      return res(
        ctx.json({token, username: mockUser.username}),
        ctx.status(200),
        ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Invalid username or password',
        }),
        ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
      );
    }
  }),

  rest.get('/me', async (req, res, ctx) => {
    const token = req.headers.get('Authorization');

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Unauthorized: No token provided',
        }),
      );
    }

    try {
      const decoded = await jose.jwtVerify(token, secret);
      return await res(
        ctx.json({
          username: decoded.payload,
        }),
        ctx.status(200),
        ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
      );
    } catch (error) {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Invalid token',
        }),
        ctx.delay(MOCK_API_CALL_REQUEST_DELAY),
      );
    }
  }),

  rest.post('/logout', async (req, res, ctx) => {
    const token = req.headers.get('Authorization');

    if (!token) {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Unauthorized: No token provided',
        }),
      );
    }

    try {
      const decoded = await jose.jwtVerify(token, secret);
      return await res(
        ctx.json({
          username: decoded.payload,
          // Add other user details here
        }),
        ctx.status(200),
      );
    } catch (error) {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Invalid token',
        }),
      );
    }
  }),
];
