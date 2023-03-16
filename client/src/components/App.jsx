// import { createRoot } from 'react-dom/client';
import React from 'react';
import ProductDetails from './ProductDetails/ProductDetails';
import RatingsReviews from './RatingsReviews/RatingsReviews';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedItems from './RelatedItems/RelatedItems';

function App() {
  return (
    <div>
      <ProductDetails />
      <RelatedItems />
      <RatingsReviews />
      <QuestionsAnswers />
    </div>
  );
}

export default App;
