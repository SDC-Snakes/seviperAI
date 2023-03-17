// import { createRoot } from 'react-dom/client';
import React from 'react';
import ProductDetails from './ProductDetails/ProductDetails';
import RatingsReviews from './RatingsReviews/RatingsReviews';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedItems from './RelatedItems/RelatedItems';
import DefaultCSSExample from './DefaultCSSExample';

function App() {
  return (
    <div>
      <ProductDetails />
      <RelatedItems />
      <RatingsReviews />
      <QuestionsAnswers />
      <DefaultCSSExample />
    </div>
  );
}

export default App;
