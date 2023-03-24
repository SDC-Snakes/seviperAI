// import {
//   AnyAction,
//   combineReducers,
//   configureStore,
//   EnhancedStore,
//   Middleware,
//   Reducer,
// } from "@reduxjs/toolkit";

// export function setupApiStore<
//   A extends {
//     reducer: Reducer<any, any>;
//     reducerPath: string;
//     middleware: Middleware;
//     util: { resetApiState(): any };
//   },
//   R extends Record<string, Reducer<any, any>> = Record<never, never>
// >(api: A, extraReducers?: R): { api: any; store: EnhancedStore } {
//   /*
//    * Modified version of RTK Query's helper function:
//    * https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/query/tests/helpers.tsx
//    */
//   const getStore = (): EnhancedStore =>
//     configureStore({
//       reducer: combineReducers({
//         [api.reducerPath]: api.reducer,
//         ...extraReducers,
//       }),
//       middleware: (gdm) =>
//         gdm({ serializableCheck: false, immutableCheck: false }).concat(
//           api.middleware
//         ),
//     });

//   type StoreType = EnhancedStore<
//     {
//       api: ReturnType<A["reducer"]>;
//     } & {
//       [K in keyof R]: ReturnType<R[K]>;
//     },
//     AnyAction,
//     ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
//       ? M
//       : never
//   >;

//   const initialStore = getStore() as StoreType;
//   const refObj = {
//     api,
//     store: initialStore,
//   };
//   const store = getStore() as StoreType;
//   refObj.store = store;

//   return refObj;
// }

import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// As a basic setup, import your same slice reducers
import productsReducer from '../../src/features/products/productsSlice';
import reviewsReducer from '../../src/features/reviews/reviewsSlice';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},

    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { products: productsReducer, reviews: reviewsReducer }, preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}