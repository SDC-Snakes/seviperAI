import { createSlice } from "@reduxjs/toolkit";
import { api } from '../api/apiSlice';

const initialState = {
  hello: 'world',
  questions: [],
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getQuestions.matchFulfilled, (state, action) => {
        state.results = action.payload;
      });
  },
});

export const {} = questionsSlice.actions;

export default questionsSlice.reducer;
