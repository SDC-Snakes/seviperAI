// this is the Average ratings and reviews component
import React from 'react';
import StarRating from './StarRating';
import RatingBar from './RatingsBar';

const AverageRatings = () => {
  return(
    <aside>
      <h3>RATINGS & REVIEWS</h3>
      <StarRating/>
       <div>% of reviews recommend this product</div>
      {
        [...Array(5)].map((element, index) => {
          return(<div key={index.toString()}> <RatingBar index={index} /> </div> );
        })
      }
    </aside>
  )
}

export default AverageRatings;