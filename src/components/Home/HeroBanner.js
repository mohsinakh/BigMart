import React from 'react';
import { Link } from 'react-router-dom';
import '../css/HeroBanner.css'; // Import the CSS file

const HeroBanner = () => {
  return (
    <div className="hero-banner" style={{ backgroundImage: "url('/hero-banner.jpg')" }}>
      <div className="hero-content">
        <h1 className="display-4">Welcome to <span className="text-highlighted">BigMart</span></h1>
        <p className="lead">Discover amazing varieties of high-quality products that suit your style.</p>
        <Link to="/products" className="btn btn-primary btn-lg">Shop Now</Link>
      </div>
    </div>
  );
}

export default HeroBanner;
