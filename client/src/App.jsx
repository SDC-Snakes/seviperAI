import { createRoot } from 'react-dom/client';
import React from 'react';
import ProductDetails from './ProductDetails.jsx';
import RatingsReviews from './RatingsReviews.jsx';
import QuestionsAnswers from './QuestionsAnswers.jsx';
import RelatedItems from './RelatedItems.jsx';

const App () => {
  return (
    <div>
      <ProductDetail />
      <RatingsReviews />
      <QuestionsAnswers />
      <RelatedItems />
    </div>
  );
}
// const domNode = document.getElementById('root');
// const root = createRoot(domNode);
// root.render(<App />);
