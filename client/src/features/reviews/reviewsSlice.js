import { createSlice } from "@reduxjs/toolkit";
import { api } from '../api/apiSlice';

const initialState = {
  reviews: {},
  meta: {},
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getProductReviews.matchFulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addMatcher(api.endpoints.getMetaReviews.matchFulfilled, (state, action) => {
        state.meta = action.payload;
      });
  },
});

export const { reset } = reviewsSlice.actions;

export default reviewsSlice.reducer;
