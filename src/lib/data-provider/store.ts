import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { customerApi } from './services/customer';

export const store = configureStore({
    reducer: {
        [customerApi.reducerPath]: customerApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(customerApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
