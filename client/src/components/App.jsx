// import { createRoot } from 'react-dom/client';
import React from 'react';
import ProductDetails from './ProductDetails/ProductDetails';
import ReviewsAndRatings from './RatingsReviews/ReviewsAndRatings';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedItems from './RelatedItems/RelatedItems';


function App() {
  return (
    <div>
      <ProductDetails />
      <RelatedItems />
      <ReviewsAndRatings />
      <QuestionsAnswers />

    </div>
  );
}

export default App;
