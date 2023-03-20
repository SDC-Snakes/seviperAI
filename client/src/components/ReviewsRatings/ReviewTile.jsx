// this is the Review Tile component
import React from 'react';
import QuarterStarsAverageRating from './QuarterStarsAverageRating';
import Report from './Report';

function ReviewTile() {
  return (
    <div>
      <QuarterStarsAverageRating />
      <h5>Review Title</h5>
      <p>Review Body, asf fjsadf sdjhr tefjlaskdf ajsflas
         fhglrkitjas falsdkfjs dfghjowernfs df fjhaslf dsfhalsdnfk
      </p>
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
