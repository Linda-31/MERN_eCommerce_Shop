import React from 'react';
import "../Styles/style.css";

function StarRating() {

  const rating = Math.floor(Math.random() * 11) / 2; 

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const totalStars = 5;

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="text-warning" style={{ fontSize: "24px" }}>&#9733;</span> 
      ))}
      {halfStar && <span className="text-warning" style={{ fontSize: "24px" }}>★</span>} 
      {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <span key={i} className="text-warning" style={{ fontSize: "24px" }}>&#9734;</span> 
      ))}
      <span style={{marginLeft: "10px"}}></span> 
    </div>
  );
};

export default StarRating;
