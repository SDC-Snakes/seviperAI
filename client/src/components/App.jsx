// import { createRoot } from 'react-dom/client';
import React from 'react';
import ProductDetails from './ProductDetails/ProductDetails';
import RatingsReviews from './RatingsReviews/RatingsReviews';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedItems from './RelatedItems/RelatedItems';
import { useGetFirstProductQuery } from '../features/api/apiSlice';

function App() {
  const { data: product, isLoading } = useGetFirstProductQuery();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <ProductDetails productId={product.id} />
      <RelatedItems />
      <RatingsReviews />
      <QuestionsAnswers />
    </div>
  );
}

export default App;
