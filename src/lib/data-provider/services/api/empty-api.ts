// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import type {MaybePromise} from '@reduxjs/toolkit/dist/query/tsHelpers';
import type {BaseQueryApi} from '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import type {RootState} from '@/lib/data-provider/store';

const prepareHeaders = (
  headers: Headers,
  {
    getState,
  }: Pick<BaseQueryApi, 'endpoint' | 'extra' | 'forced' | 'getState' | 'type'>,
): MaybePromise<Headers> => {
  // By default, if we have a token in the store, let's use that for authenticated requests
  const token = (getState() as RootState).auth.token;
  headers.set('Accept', 'application/json');

  if (token) {
    headers.set('Authorization', token);
  }

  return headers;
};

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({baseUrl: '/', prepareHeaders}),
  endpoints: () => ({}),
});
