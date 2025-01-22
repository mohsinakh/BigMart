import React from 'react';
import HeroBanner from './Home/HeroBanner';
import FeaturedCategories from './Home/FeaturedCategories';
import Slider from './Home/Slider';
import Products from './Products';
import './css/Home.css'; // Import the custom CSS

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="page-title">Welcome to Our Store</h1>
      <HeroBanner />
      <Slider />
      <FeaturedCategories />
      <Products />
    </div>
  );
};

export default Home;
