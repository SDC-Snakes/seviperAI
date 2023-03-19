import { createSlice } from "@reduxjs/toolkit";
import { api } from '../api/apiSlice';

const initialState = {
  product: {},
  selectedStyle: {},
  styles: {},
  details: {},
  images: [],
  selectedImage: '',
  expanded: false,
};

// eslint-disable-next-line default-param-last
function changeStyle(state = initialState, action) {
  return { ...state, selectedStyle: action.payload };
}

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: (state) => initialState,
    newSelectedStyle: changeStyle,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getProductInfo.matchFulfilled, (state, action) => {
        state.styles = action.payload.styles.results;
        state.details = action.payload.details;
        state.selectedStyle = state.styles[0];
      });
  },
});

export const { reset, newSelectedStyle } = productsSlice.actions;

export default productsSlice.reducer;
