import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/apiSlice';

const initialState = {
  related: [],
  relatedIndex: 0,
  outfitIndex: 0,
  outfitLength: 0,
  modalOpen: false,
};

function moveRelatedCarousel(state = initialState, action) {
  return { ...state, relatedIndex: action.payload };
}
function moveOutfitCarousel(state = initialState, action) {
  return { ...state, outfitIndex: action.payload };
}
function toggleModal(state = initialState, action) {
  const toggle = (input) => !input;
  state.modalOpen = toggle(state.modalOpen);
}

const relatedSlice = createSlice({
  name: 'related',
  initialState,
  reducers: {
    reset: (state) => initialState,
    newRelatedCarouselIndex: moveRelatedCarousel,
    newOutfitCarouselIndex: moveOutfitCarousel,
    newModalState: toggleModal,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getRelatedProductInfo.matchFulfilled, (state, action) => {
        state.related = action.payload;
      });
  },
});

export const {
  reset,
  newRelatedCarouselIndex,
  newOutfitCarouselIndex,
  newModalState,
} = relatedSlice.actions;

export default relatedSlice.reducer;
