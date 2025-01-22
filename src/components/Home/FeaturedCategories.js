import React from 'react';
import '../css/FeaturedCategories.css'; // Import the CSS file

const FeaturedCategories = () => {
  return (
    <div className="featured-categories container mt-5 ">
      <h2 className="text-center mb-4">Featured Categories</h2>
      <div className="row">
        {/* Category 1 */}
        <div className="col-md-4 mb-4">
          <div className="category-item text-center">
            <img src="https://i.imgur.com/PYHFgqM.jpg" alt="Category 1" className="img-fluid" />
            <h3>Electronics</h3>
          </div>
        </div>

        {/* Category 2 */}
        <div className="col-md-4 mb-4">
          <div className="category-item text-center">
            <img src="https://i.imgur.com/gvxawnb.jpg" alt="Category 2" className="img-fluid" />
            <h3>Fashion</h3>
          </div>
        </div>

        {/* Category 3 */}
        <div className="col-md-4 mb-4">
          <div className="category-item text-center">
            <img src="https://i.imgur.com/t9LmJcj.jpg" alt="Category 3" className="img-fluid" />
            <h3>Home Decor</h3>
          </div>
        </div>

        {/* Add more category items */}
      </div>
    </div>
  );
}

export default FeaturedCategories;
