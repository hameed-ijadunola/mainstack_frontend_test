import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../customFetchBaseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
    }),
    getWallet: builder.mutation({
      query: (id) => ({
        url: `wallet/${id}`,
        method: 'GET',
      }),
    }),
    getTransactions: builder.mutation({
      query: () => ({
        url: `transactions`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetUserMutation,
  useGetWalletMutation,
  useGetTransactionsMutation,
} = userApi;
