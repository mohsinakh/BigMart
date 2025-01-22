import React, { useContext, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import mainContext from "../context/mainContext";
import getStars from "./Rating";
import "./css/productDetails.css";
import ReactLoading from "react-loading"; // Import the react-loading library
import cartContext from "../context/cartContext";

const ProductDetails = () => {
  const context = useContext(mainContext);
  const cartcontext = useContext(cartContext);
  const { productById, getProductById, loading } = context;
  const {  cartloading,AddtoCart } = cartcontext;

  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      if (product && !loading) {
        await getProductById(product._id);
      }
    }
    fetchData();
    //eslint-disable-next-line
  }, []);
  
 
  
  const handleAddtoCart = async ()=>{
    if(localStorage.getItem("token")){
    await AddtoCart(productById._id)
    navigate("/cart")
    window.scroll(0,0)
  }
  else{
    navigate("/login")
  }
}
  
  
  
  return (
    <div className="product-details-container">
      <div className="product-details-content">
        {cartloading ? (
          <div className="d-flex justify-content-center align-items-center loading-container">
            <ReactLoading
              type="bars"
              color="#f96b44"
              height={100}
              width={100}
              className="loading-bar"
            />
          </div>
        ) : productById ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="product-image">
                  <img
                    src={productById.pimg}
                    alt={productById.pname}
                    className="card-img-top"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product-info">
                  <div className="d-flex justify-content-between product-titles">
                    <h3 className="mt-3">{productById.pname}</h3>
                    <div className="product-rating mt-3">
                      <h5 className="mb-0">Rating: </h5>
                      <span className="stars">{getStars(productById.prating)} {productById.prating} Out of 5</span>
                    </div>
                  </div>
                  <h5 className="product-description">{productById.pdescription}</h5>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="product-availability">
                      {productById.availability ? (
                        <span className="in-stock">In Stock</span>
                      ) : (
                        <span className="out-of-stock">Out of Stock</span>
                      )}
                    </div>
                    <button className="btn btn-primary add-to-cart" onClick={handleAddtoCart}>Add to Cart</button>
                  </div>
                  <h5 className="product-price mt-3">
                    Price: {productById.price.regular}{" "}
                    {productById.price.currency === "USD" ? `($USD)` : productById.price.currency}
                  </h5>
                </div>
              </div>
            </div>
            {productById.specifications.length!==0 && <div className="table-responsive mt-4">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Specification</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {productById.specifications.map((spec, index) => (
                    <tr key={index}>
                      <td>{spec.name}</td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}
            {productById.pdetailedDescription && (
              <div className={`product-detailed-description ${productById.specifications.length === 0 ? "no-spec" : ""}`} >
                <h5>Detailed Description:</h5>
                <p>{productById.pdetailedDescription}</p>
              </div>
            )}
          </div>
        ) : (
          <p>No product details available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
