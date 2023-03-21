import { createSlice } from "@reduxjs/toolkit";
import { api } from '../api/apiSlice';

const initialState = {
  selectedStyle: {},
  styles: {},
  details: {},
  selectedImage: '',
  expanded: false,
  sku: {
    size: '',
    quantity: 0,
  },
  imageIndex: 0,
  page: 0,
};

// eslint-disable-next-line default-param-last
function changeStyle(state = initialState, action) {
  return { ...state, selectedStyle: action.payload };
}
function changeImage(state = initialState, action) {
  return { ...state, selectedImage: action.payload };
}
function updateState(state = initialState, action) {
  return { ...state, [action.payload.name]: action.payload.value };
}
function toggle(state = initialState, action) {
  return { ...state, [action.payload]: !state[action.payload] };
}
function imageIndex(state = initialState, action) {
  return { ...state, imageIndex: action.payload };
}

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState,
    newSelectedStyle: changeStyle,
    newSelectedImage: changeImage,
    handleStateUpdate: updateState,
    toggleState: toggle,
    newImageIndex: imageIndex,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getProductInfo.matchFulfilled, (state, action) => {
        state.styles = action.payload.styles.results;
        state.details = action.payload.details;
        state.selectedStyle = state.styles[0];
        state.selectedImage = state.styles[0].photos[0].url;
      });
  },
});

export const {
  reset,
  newSelectedStyle,
  newSelectedImage,
  handleStateUpdate,
  toggleState,
  newImageIndex,
} = productsSlice.actions;

export default productsSlice.reducer;
