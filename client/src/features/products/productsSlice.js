import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from './productsService';

const initialState = {
  product: {},
};

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: (state) => initialState,
});

const { reset } = productsSlice.actions;
