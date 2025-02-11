import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/Slider.css'; // Import the CSS file

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleNextClick = () => {
    setIndex((index + 1) % 3);
  };

  const handlePrevClick = () => {
    setIndex((index - 1 + 3) % 3);
  };

  const quotes = [
    "Your journey begins here.",
    // Add more quotes if needed
  ];

  return (
    <div className="slider custom-carousel">
      <Carousel
        showArrows={false}
        showThumbs={false}
        showStatus={false}
        selectedItem={index}
        onChange={() => {}}
      >
        <div className="slide">
          <div className="image">
            <img src="https://i.postimg.cc/RFZtSPpH/x-ZDIx-JO-Imgur.jpg" alt="Slide 1" className="img-fluid" />
          </div>
        </div>
        <div className="slide">
          <div className="image">
            <img src="https://i.postimg.cc/W1Z6Cfxp/7-RMG71-F-Imgur.jpg" alt="Slide 2" className="img-fluid" />
          </div>
        </div>
        <div className="slide">
          <div className="image">
            <img src="https://i.postimg.cc/wxWVmNhz/ga-UUQj-I-Imgur.jpg" alt="Slide 3" className="img-fluid" />
          </div>
        </div>
        {/* Add more slides */}
      </Carousel>
      <p className="quote">{quotes[0]}</p>

      <button className="carousel-arrow carousel-arrow-prev" onClick={handlePrevClick}>
        &#8249;
      </button>
      <button className="carousel-arrow carousel-arrow-next" onClick={handleNextClick}>
        &#8250;
      </button>
    </div>
  );
};

export default Slider;
