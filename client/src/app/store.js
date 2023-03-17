import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import questionsReducer from '../features/questions/questionsSlice';
import relatedReducer from '../features/related/relatedSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import { api } from '../features/api/apiSlice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    products: productsReducer,
    questions: questionsReducer,
    related: relatedReducer,
    reviews: reviewsReducer,
  },
  // Add the RTK Query API middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export default store;
