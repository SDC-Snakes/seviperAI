import { createSlice } from "@reduxjs/toolkit";
import { api } from '../api/apiSlice';

const initialState = {
  reviews: {},
  meta: {},
  refFn: {},
};

function updateState(state = initialState, action) {
  return { ...state, [action.payload.name]: action.payload.value };
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reset: (state) => initialState,
    changeState: updateState,
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

export const { reset, changeState } = reviewsSlice.actions;

export default reviewsSlice.reducer;
