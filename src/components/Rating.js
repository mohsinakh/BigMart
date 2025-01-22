import React from 'react';
const getStars = (rating) => {
    rating = Math.round(rating * 2) / 2;
    let output = [];
  
    for (let i = rating; i >= 1; i--)
      output.push(
        <i
          key={`full-${i}`}
          className="fa fa-star"
          aria-hidden="true"
          style={{  color: "#ffa534", textShadow: "0px 0px 2px black" }}
        ></i>
      );
  
    if (rating % 1 !== 0)
      output.push(
        <i
          key="half"
          className="fa fa-star-half-o"
          aria-hidden="true"
          style={{  color: "#ffa534", textShadow: "0px 0px 1.5px black" }}
        ></i>
      );
  
    for (let i = 5 - Math.ceil(rating); i >= 1; i--)
      output.push(
        <i
          key={`empty-${i}`}
          className="fa fa-star-o"
          aria-hidden="true"
          style={{ color: "",textShadow: "0px 0px 1.5px black"  }}
        ></i>
      );
  
    return output;
  };

export default getStars;