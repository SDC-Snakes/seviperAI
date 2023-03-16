// import { createRoot } from 'react-dom/client';
import React from 'react';
import ProductDetails from './ProductDetails/ProductDetails.jsx';
import RatingsReviews from './RatingsReviews/RatingsReviews.jsx';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers.jsx';
import RelatedItems from './RelatedItems/RelatedItems.jsx';

function App() {
  return (
    <div>
      <div>hello world</div>
      <ProductDetails />
      <RatingsReviews />
      <QuestionsAnswers />
      <RelatedItems />
    </div>
  );
}

export default App;
// const domNode = document.getElementById('root');
// const root = createRoot(domNode);
// root.render(<App />);
