import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BookUrl } from './urls';
import { IBook } from '../../interface/book.interface';


export const bookApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BookUrl }),
    reducerPath:"bookApi",
    endpoints: (builder) => ({
        getAllBooks: builder.query<IBook[], { genre?: string; year?: number; q?: string; limit?: number; page?: number }>({
            query: ({ genre, year, q, limit, page }) => ({
                url: '/',
                params: { genre, year, q, limit, page },
            }),
        }),
        createBook: builder.mutation({
            query: (newBook) => ({
                url: '/',
                method: 'POST',
                body: newBook,
            }),
        }),
        updateBook: builder.mutation({
            query: ({ bookId, updates }) => ({
                url: `/${bookId}`,
                method: 'PUT',
                body: updates,
            }),
        }),
        deleteBook: builder.mutation({
            query: (bookId) => ({
                url: `/${bookId}`,
                method: 'DELETE',
            }),
        }),
        getBookById: builder.query<IBook, string>({
            query: (bookId:string) => `/${bookId}`,
        }),
    }),
});

export const { useGetAllBooksQuery, useCreateBookMutation,useGetBookByIdQuery, useUpdateBookMutation, useDeleteBookMutation } = bookApi;
