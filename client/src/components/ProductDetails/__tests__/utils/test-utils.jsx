import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// As a basic setup, import your same slice reducers
import productsReducer from '../../../../features/products/productsSlice';
import questionsReducer from '../../../../features/questions/questionsSlice';
import relatedReducer from '../../../../features/related/relatedSlice';
import reviewsReducer from '../../../../features/reviews/reviewsSlice';
import { api } from '../../../../features/api/apiSlice';

// eslint-disable-next-line import/prefer-default-export
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer:
       {
         [api.reducerPath]: api.reducer,
         products: productsReducer,
         questions: questionsReducer,
         related: relatedReducer,
         reviews: reviewsReducer,
       },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
