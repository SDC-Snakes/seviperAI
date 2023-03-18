// this is the Average ratings and reviews component
import React from 'react';
import StarRating from './StarRating';
import RatingBar from './RatingsBar';
import QuarterIncStarRating from './QuarterIncStarRating';


const AverageRatings = () => {
  return(
    <aside>
      <h3>RATINGS & REVIEWS</h3>
      <StarRating/>
      <QuarterIncStarRating/>
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