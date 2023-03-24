import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import ProductDetails from './ProductDetails/ProductDetails';
import ReviewsAndRatings from './ReviewsRatings/ReviewsAndRatings';
import QuestionsAnswers from './QuestionsAnswers/QuestionsAnswers';
import RelatedItems from './RelatedItems/RelatedItems';
import Landing from './SharedComponents/Landing';
import Navbar from './SharedComponents/Navbar';
import SiteAnnouncement from './SharedComponents/SiteAnnouncement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const rnrRef = React.useRef(null);
  const handleScroll = () => {
    rnrRef.current.scrollIntoView();
  };

  return (
    <div>
      <ToastContainer />
      <Router>
        <Navbar />
        <SiteAnnouncement />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/NotFound" element={<div>404 not found...</div>} />
          <Route
            path="/:productId"
            element={(
              <>
                <ProductDetails handleScroll={handleScroll} />
                <RelatedItems />
                <QuestionsAnswers />
                <div ref={rnrRef}>
                  <ReviewsAndRatings />
                </div>
              </>
          )}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
