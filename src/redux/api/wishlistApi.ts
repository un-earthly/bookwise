import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook } from '../../interface/book.interface';
import { wishListUrl } from './urls';

export const wishlistApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: wishListUrl }),
    reducerPath: "wishlistApi",
    endpoints: (builder) => ({
        getWishlist: builder.query<IBook[], void>({
            query: () => '/',
        }),
    }),
});

export const { useGetWishlistQuery } = wishlistApi;