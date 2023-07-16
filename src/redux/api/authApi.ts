import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserURL } from './urls';
export interface User {
    email: string
    password: string
}
export interface NewUser {
    username: string,
    email: string
    password: string,
    contact: string
}

export const authApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: UserURL }),
    reducerPath: "authApi",
    endpoints: (builder) => ({
        loginUser: builder.mutation<User, Partial<User> & Pick<User, 'email'>>({
            query: ({ email, ...data }) => ({
                url: "/login",
                method: 'POST',
                body: { ...data, email },
            }),
        }),
        registerUser: builder.mutation<NewUser, Partial<NewUser> & Pick<NewUser, 'email'>>({
            query: ({ email, ...data }) => ({
                url: "/register",
                method: 'POST',
                body: { ...data, email },
            }),
        })
    })
})
// export const authApi = createApi({
//     baseQuery: fetchBaseQuery({ baseUrl: AuthUrl }),
//     reducerPath: "authApi",
//     endpoints: (builder) => ({
//         loginUser: builder.mutation<User, Partial<User> & Pick<User, 'email'>>({
//             query: ({ email, ...data }) => ({
//                 url: AuthUrl + "/login",
//                 method: 'POST',
//                 body: data,
//             }),
//         }),
//     }),
// });
export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
