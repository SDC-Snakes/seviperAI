import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// RTK Query

export const api = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (build) => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    // builder.mutation() would be for posts modifiying server
    getFirstProduct: build.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/products?page=1&count=1',
    }),
    getSpecificProduct: build.query({
      // The URL for the request is '/fakeApi/posts'
      query: (productId) => `/products/${productId}`,
    }),
    // EXAMPLE MUTATION endpoint!!!
    // updateReview: build.mutation({
    //   query: reviewId => ({
    //     url: `/reviews/${reviewId}`,
    //     method: 'POST',
    //     body: updatedReview
    //   })
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetFirstProductQuery, useGetSpecificProductQuery } = api;
