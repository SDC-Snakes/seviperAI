import { createSlice } from "@reduxjs/toolkit";
import { api } from '../api/apiSlice';

const initialState = {
  related: {},
};

const relatedSlice = createSlice({
  name: 'related',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getRelatedProductInfo.matchFulfilled, (state, action) => {
        state.related = action.payload.data;
      });
  },
});

export const { reset } = relatedSlice.actions;

export default relatedSlice.reducer;
