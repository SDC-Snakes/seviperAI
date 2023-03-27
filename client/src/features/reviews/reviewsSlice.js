/* eslint-disable no-param-reassign */
/* eslint-disable default-param-last */
import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/apiSlice';

const initialState = {
  reviews: {},
  meta: {},
  ratingBarSelect: [],
  reviewTileCount: 0,
  starRating: 1,
  reviewPostObj: {
    product_id: 0,
    rating: 0,
    summary: '',
    body: '',
    recommend: false,
    name: '',
    email: '',
    photos: [],
    characteristics: {},
  },
};

function updateState(state = initialState, action) {
  return { ...state, [action.payload.name]: action.payload.value };
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reset: (state) => initialState,

    newSetRating: (state, action) => {
      if (!state.ratingBarSelect.includes(action.payload)) {
        state.ratingBarSelect.push(action.payload);
      } else {
        state.ratingBarSelect = state.ratingBarSelect.filter((rating) => rating !== action.payload);
      }
    },
    newResetRating: (state) => {
      state.ratingBarSelect = [];
    },
    newReviewTileCount: (state) => {
      state.reviewTileCount += 1;
    },

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

// eslint-disable-next-line max-len
export const {
  reset, newSetRating, newResetRating, changeState, newReviewTileCount,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
