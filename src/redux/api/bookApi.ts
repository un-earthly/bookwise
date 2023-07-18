import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BookUrl } from './urls';
import { IBook } from '../../interface/book.interface';
export const bookApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BookUrl }),
    tagTypes: ["book"],
    reducerPath: "bookApi",
    endpoints: (builder) => ({
        getAllBooks: builder.query<{ data: IBook[] }, undefined>({
            query: () => ({
                url: '/',
            }),
            providesTags: ['book'],
        }),
        filterBooks: builder.query<{ data: IBook[] }, { genre?: string; year?: number; page?: number; pageSize?: number }>({
            query: ({ genre, year, page, pageSize }) => ({
                url: '/filter',
                params: { genre, year, page, pageSize },
                invalidatesTags: ["book"],
            }),
        }),
        searchBooks: builder.query<{ data: IBook[] }, { query: string | undefined; page?: number; pageSize?: number }>({
            query: ({ query, page, pageSize }) => ({
                url: '/search',
                params: { query, page, pageSize },
                invalidatesTags: ["book"]
            }),

        }),
        createBook: builder.mutation({
            query: (newBook) => ({
                url: '/',
                method: 'POST',
                body: newBook,
            }),
            invalidatesTags: ["book"]
        }),
        updateBook: builder.mutation({
            query: ({ bookId, updates }) => ({
                url: `/${bookId}`,
                method: 'PUT',
                body: updates,
            }),
            invalidatesTags: ['book'],

        }),
        deleteBook: builder.mutation({
            query: (bookId) => ({
                url: `/${bookId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['book'],

        }),
        getBookById: builder.query<{ data: IBook }, string>({
            query: (bookId: string) => `/${bookId}`,
        }),

    }),
});

export const { useGetAllBooksQuery, useCreateBookMutation, useFilterBooksQuery, useSearchBooksQuery, useGetBookByIdQuery, useUpdateBookMutation, useDeleteBookMutation } = bookApi;
