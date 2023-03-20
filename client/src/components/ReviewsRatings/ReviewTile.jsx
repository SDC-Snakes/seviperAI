// this is the Review Tile component
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';
import QuarterStarsAverageRating from './QuarterStarsAverageRating';
import Report from './Report';

function ReviewTile({index}) {
  const { reviews } = useSelector((state) => state.reviews);
  console.log("reviews", reviews);
  return (
    <div>
      <QuarterStarsAverageRating />
      <h5>Review Title {reviews.results[index].summary}</h5>
      <small>Date posted: { formatDistanceToNow(new Date(reviews.results[index].date))} </small>
      <p>{reviews.results[index].body}</p>
      <div>
        Helpful? Yes or NO  |
        <Report />
      </div>
      <div>_________________________________________________________________________________</div>
    </div>
  );
}

//<Search Bar Component>
//<average ratings component/>
//<Reviews component>

export default ReviewTile;
