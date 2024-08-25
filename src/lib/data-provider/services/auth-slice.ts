import {createSlice} from '@reduxjs/toolkit';
import {assign} from 'lodash';

import {api} from '@/lib/data-provider/services/api';

interface User {
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

export type AuthSlice = typeof slice;

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: true,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    /* LOGIN  */
    builder
      .addMatcher(api.endpoints.login.matchPending, (state, action) => {
        state.isInitialized = false;
        console.log('pending', action);
      })
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);

        assign(state, {
          user: {username: action.payload.username},
          token: action.payload.token,
        });

        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addMatcher(api.endpoints.login.matchRejected, (state, action) => {
        console.log('rejected', action);
        state.isInitialized = true;
      })

      /* Initialize SESSION */
      .addMatcher(api.endpoints.getMe.matchPending, (state, action) => {
        console.log('pending', action);
      })
      .addMatcher(api.endpoints.getMe.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);
        assign(state, {
          user: {username: action.payload.username},
        });
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addMatcher(api.endpoints.getMe.matchRejected, (state, action) => {
        console.log('rejected', action);
        assign(state, initialState);
      })

      /* LOGOUT */
      .addMatcher(api.endpoints.logout.matchPending, (state, action) => {
        state.isInitialized = false;
        console.log('logout', action);
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, (state, action) => {
        console.log('logout', action);
        assign(state, initialState);
      })
      .addMatcher(api.endpoints.logout.matchRejected, (state, action) => {
        console.log('logout', action);
        // assign(state, initialState);
        assign(state, initialState);
      });
  },
});

export default slice.reducer;
export const authActions = {...slice.actions};
