import React, { useContext, useEffect } from "react";
import mainContext from "../context/mainContext";
import Product from "./Product";
import ReactLoading from "react-loading";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/Products.css"; // Custom CSS for Products page

const Products = () => {
  const context = useContext(mainContext);
  const { products, getProducts, loading } = context;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products only if they haven't been fetched already
    if (products.length === 0) {
      getProducts();
    }

    // eslint-disable-next-line
  }, []);

  const handleAllProducts = () =>{

    navigate("/products")
    window.scroll(0,0)
  }

  const location = useLocation();

  // Determine the number of products to display based on the route
  const numProductsToDisplay =
    location.pathname === "/products" ? products.length : 3;

  if (loading) {
    return (
      <div className="loading-container">
        <ReactLoading type="bars" color="#f96b44" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="container products-container my-5">
      <h2 className="text-center mb-3">
        {numProductsToDisplay === 3 ? "Top Products" : "All Products"}
      </h2>

      <div className="text-center no-products">
        {!loading && products.length === 0 ? <p>No products to show</p> : ""}
      </div>
      <div className="row">
        {products.slice(0, numProductsToDisplay).map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
      {numProductsToDisplay === 3 && (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <p className="mr-3 shop-text">Shop from</p>
          <button  className="btn btn-primary shop-btn" onClick={handleAllProducts}>
            All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
