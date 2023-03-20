import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import ProductDetails from './ProductDetails/ProductDetails';
import ReviewsAndRatings from './ReviewsRatings/ReviewsAndRatings';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedItems from './RelatedItems/RelatedItems';
import Spinner from './SharedComponents/Spinner';
import Navbar from './SharedComponents/Navbar';
import SiteAnnouncement from './SharedComponents/SiteAnnouncement';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <SiteAnnouncement />
        <Routes>
          <Route path="/" element={<Spinner />} />
          <Route
            path="/:productId"
            element={(
              <>
                <ProductDetails />
                <RelatedItems />
                <QuestionsAnswers />
                <ReviewsAndRatings />
              </>
          )}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
