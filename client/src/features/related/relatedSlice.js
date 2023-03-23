import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api/apiSlice';

const initialState = {
  related: [],
  relatedIndex: 0,
  outfitIndex: 0,
  outfitLength: 0,
  modalOpen: false,
  relatedProductFeatures: {},
  relatedProductName: null,
  currentProductName: null,
  combinedProductFeatures: [],
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
function setRelatedProductFeatures(state = initialState, action) {
  return { ...state, relatedProductFeatures: action.payload };
}
function setRelatedProductName(state = initialState, action) {
  state.relatedProductName = action.payload;
}
function setCurrentProductName(state = initialState, action) {
  state.currentProductName = action.payload;
}

function generateCombinedProductFeatures(state = initialState, action) {
  const combinedData = [];
  const relatedProductDetails = state.relatedProductFeatures;
  const currentProductDetails = action.payload;
  relatedProductDetails.forEach((char) => {
    const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
    combinedData.push({ value: description, related: true, current: false });
  });
  currentProductDetails.forEach((char) => {
    const description = char.value ? `${char.feature}: ${char.value}` : char.feature;
    let hasCharacteristic = false;
    combinedData.forEach((existingChar) => {
      if (existingChar.value === description) {
        existingChar.current = true;
        hasCharacteristic = true;
      }
    });
    if (!hasCharacteristic) {
      combinedData.push({ value: description, related: false, current: true });
    }
    state.combinedProductFeatures = combinedData;
  });
}

const relatedSlice = createSlice({
  name: 'related',
  initialState,
  reducers: {
    reset: (state) => initialState,
    newRelatedCarouselIndex: moveRelatedCarousel,
    newOutfitCarouselIndex: moveOutfitCarousel,
    newModalState: toggleModal,
    newRelatedProductFeatures: setRelatedProductFeatures,
    generateProductFeatures: generateCombinedProductFeatures,
    newRelatedProductName: setRelatedProductName,
    newCurrentProductName: setCurrentProductName,
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
  newRelatedProductFeatures,
  generateProductFeatures,
  newRelatedProductName,
  newCurrentProductName,
} = relatedSlice.actions;

export default relatedSlice.reducer;
