import { createSlice } from "@reduxjs/toolkit";
import { api } from '../api/apiSlice';

const initialState = {
  related: [],
  carouselIndex: 0,
  outfitIndex: 0,
  outfitLength: 0,
};

function moveRelatedCarousel(state = initialState, action) {
  return { ...state, carouselIndex: action.payload };
}
function moveOutfitCarousel(state = initialState, action) {
  return { ...state, outfitIndex: action.payload };
}

const relatedSlice = createSlice({
  name: 'related',
  initialState,
  reducers: {
    reset: (state) => initialState,
    newRelatedCarouselIndex: moveRelatedCarousel,
    newOutfitCarouselIndex: moveOutfitCarousel,

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
  newRelatedCarouselIndex,
  newOutfitCarouselIndex,
} = relatedSlice.actions;

export default relatedSlice.reducer;
