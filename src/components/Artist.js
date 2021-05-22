import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";

const Artist = (props) => {
	const artist = props.data;
	const rating = parseInt(artist.popularity/20);


  return (
    <li className="artist">
		  <Link to={'/artistInfo/' + artist.id} style={{ textDecoration: 'none' }}>
			  <div className="artist-img">
				  <img alt={artist.name} src={(typeof artist.images !== 'undefined' && artist.images.length > 0) ? artist.images[0].url : '/assets/images/artist-default.png'} />
			  </div>
			  <div className="artist-desc">
				  <p className="artist-name">{artist.name}</p>
				  <p className="artist-followers">{artist.followers.total.toLocaleString("en-US")} followers</p>
				  <StarRatings
					  count={5}
					  rating={rating}
					  starDimension="30px"
					  isSelectable='false'
					  starSpacing="2px"
					  starRatedColor="green"
				  />
			  </div>
		  </Link>
    </li>
  );
};

export default Artist;