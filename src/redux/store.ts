import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { bookApi } from './api/bookApi';
import { wishlistApi } from './api/wishlistApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [bookApi.reducerPath]: bookApi.reducer,
        [wishlistApi.reducerPath]: wishlistApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(wishlistApi.middleware, authApi.middleware, bookApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
