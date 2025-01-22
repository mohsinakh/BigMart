import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import getStars from "./Rating";
import mainContext from "../context/mainContext";
import cartContext from "../context/cartContext";

const Product = (props) => {
  const context = useContext(mainContext);
  const cartcontext = useContext(cartContext);
  const { showAlert } = context;
  const { AddtoCart } = cartcontext;

  const navigate = useNavigate();
  const { product } = props;


  const handleBuy = () => {
    if (localStorage.getItem("token") || localStorage.getItem("sellertoken")) {
      navigate(`/productDetails`, { state: { product } });
      window.scroll(0,0)
    } else {
      navigate("/login");
      showAlert("Login to continue !!", "danger");
    }
  };
  
  const handleAddtoCart = async () => {
    if (localStorage.getItem("token")) {
      try {
        await AddtoCart(product._id);
        navigate(`/cart`);
        window.scroll(0, 0);
      } catch (error) {
        console.error(error);
      } 
    } else {
      navigate("/login");
      showAlert("Login to continue !!", "danger");
    }
  };

  const stars = getStars(product.prating);

  return (
    <div className="card product-card">
      <img
        src={product.pimg}
        className="card-img-top "
        alt={product.pname}
      />
      <div className="card-body">
        <h5 className="card-title">{product.pname}</h5>
        <div className="product-rating">
          {stars} {product.prating} / 5
        </div>
        <p className="card-text product-description">{product.pdescription}</p>
        <div className="button-group d-flex">
          {localStorage.getItem('token') && (
            <button
              disabled={!localStorage.getItem('token')}
              className="btn btn-primary product-buy-btn mx-2"
              onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
          )}
          <button
            className="btn btn-primary product-buy-btn"
            onClick={handleBuy}
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
