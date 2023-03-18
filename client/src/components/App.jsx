import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import ProductDetails from './ProductDetails/ProductDetails';
import ReviewsAndRatings from './RatingsReviews/ReviewsAndRatings';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedItems from './RelatedItems/RelatedItems';
import Spinner from './Spinner';
// import DefaultCSSExample from './DefaultCSSExample';


function App() {
  return (
    <div>
      <ProductDetails />
      <RelatedItems />
      <RatingsReviews />
      <QuestionsAnswers />
      {/* <DefaultCSSExample /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Spinner />} />
          <Route
            path="/:productId"
            element={(
              <>
                <ProductDetails />
                <RelatedItems />
                <ReviewsAndRatings />
                <QuestionsAnswers />
              </>
          )}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
