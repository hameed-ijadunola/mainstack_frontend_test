import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../customFetchBaseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: () => ({
        url: `user`,
        method: 'GET',
      }),
    }),
    getWallet: builder.mutation({
      query: () => ({
        url: `wallet`,
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
