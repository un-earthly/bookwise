// src/api/rtkQuery.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import axiosInstance from './apiConfig';

export const bookApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/books' }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => '/',
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
    filterBooksByGenre: builder.query({
      query: (genre) => `/filter/genre/${genre}`,
    }),
    filterBooksByPublicationYear: builder.query({
      query: (year) => `/filter/year/${year}`,
    }),
    searchBooks: builder.query({
      query: (q) => `/search?q=${q}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useCreateBookMutation, useUpdateBookMutation, useDeleteBookMutation, useFilterBooksByGenreQuery, useFilterBooksByPublicationYearQuery, useSearchBooksQuery } = bookApi;
