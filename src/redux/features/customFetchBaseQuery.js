import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = process.env.BASE_URL;
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
});

const customFetchBase = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  return result;
};

export default customFetchBase;
