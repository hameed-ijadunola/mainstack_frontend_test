import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl =
  'https://fe-task-api.mainstack.io' || process.env.REACT_APP_BASE_URL;
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'text/plain');
    return headers;
  },
});

const customFetchBase = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  return result;
};

export default customFetchBase;
