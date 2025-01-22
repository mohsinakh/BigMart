import React from 'react';
import { Link } from 'react-router-dom';
import './css/About.css'; // Custom CSS for About page

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="about-heading">Welcome to <span className="highlight">BigMart</span></h2>
            <p className="about-text">
              At <span className="highlight">BigMart</span>, we're not just an e-commerce store – we're a <span className="highlight">catalyst for innovation</span>, a hub for <span className="highlight">curated experiences</span>, and a <span className="highlight">gateway to endless possibilities</span>.
            </p>
            <p className="about-text">
              Our mission is simple: <span className="highlight">transform your shopping journey</span> into a memorable adventure that bridges the gap between imagination and reality. With a vast array of products spanning <span className="highlight">technology, fashion, home essentials</span>, and <span className="highlight">beyond</span>, we're committed to <span className="highlight">enriching your life</span> with the <span className="highlight">finest and most innovative offerings</span>.
            </p>
            <p className="about-text">
              Elevate your lifestyle with <span className="highlight">BigMart's</span> curated selection that reflects our dedication to <span className="highlight">quality, sustainability</span>, and <span className="highlight">customer-centricity</span>. Our passionate team works tirelessly to <span className="highlight">deliver exceptional service</span> and <span className="highlight">experiences</span> that resonate with your unique aspirations.
            </p>
            <Link to="/products" className="btn btn-primary">
              Explore Products
            </Link>
          </div>
          <div className="col-md-6">
            <div className="about-image-container">
              <img
                src="https://shorturl.at/aeBGT"
                alt="About Us"
                className="img-fluid about-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
