import { createSlice } from "@reduxjs/toolkit";
import { api } from '../api/apiSlice';

const initialState = {
  related: [],
  carouselIndex: 0,
  outfitIndex: 0,
  outfitLength: 0,
};

function moveCarousel(state = initialState, action) {
  return { ...state, current: action.payload };
}

const relatedSlice = createSlice({
  name: 'related',
  initialState,
  reducers: {
    reset: (state) => initialState,
    newCarouselIndex: moveCarousel,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getRelatedProductInfo.matchFulfilled, (state, action) => {
        state.related = action.payload.data;
      });
  },
});

export const {
  reset,
  newCarouselIndex,
} = relatedSlice.actions;

export default relatedSlice.reducer;
