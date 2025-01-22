import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartContext from "../context/cartContext";
import CartProduct from "./CartProduct";
import ReactLoading from "react-loading";
import "./css/Cart.css"; // Custom CSS for Cart component

const Cart = () => {

  const navigate = useNavigate();

  const cartcontext = useContext(cartContext);

  const {
    getCartProducts,
    cartProducts,
    cartloading,
    EditCart,
    RemoveFromCart
  } = cartcontext;

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        await getCartProducts();
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartData();
    // eslint-disable-next-line
  }, []);




  const handlePlaceOrder = async () => {

    const fetchCartData = async () => {
      try {
        await getCartProducts();
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartData();
    navigate("/placeOrder",{ state: { cartProducts } })
    window.scroll(0,0)
  };



  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await EditCart(productId, newQuantity);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await RemoveFromCart(productId);
    } catch (error) {
      console.error(error);
    }
  };

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (cartProducts.length > 0) {
      const total = cartProducts.reduce(
        (accumulator, cartProduct) =>
          accumulator +
          (cartProduct.product.price?.regular || 0) * cartProduct.quantity,
        0
      );
      setCartTotal(total);
    } else {
      setCartTotal(0);
    }
  }, [cartProducts]);

  if (cartProducts.length === 0) {
    return (
      <div className="loading-container">
        <h2 className="text-center">
          No products in your cart!! <br /> Please add something to your cart
        </h2>
      </div>
    );
  }

  if (cartloading) {
    return (
      <div className="loading-container">
        <ReactLoading type="bars" color="#f96b44" height={100} width={100} />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart</h2>
        {cartProducts.length > 0 && <p>Cart Total: {cartTotal.toFixed(3)}</p>}
      </div>
      <div className="cart-products">
        <div className="row m-0">
          {cartProducts.length > 0 &&
            cartProducts.map((cartProduct) => (
              <div className="col-md-4 mb-4" key={cartProduct._id}>
                <CartProduct
                  cartProduct={cartProduct}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              </div>
            ))}

          <div className="place-order-button">
            {cartProducts.length > 0 && (
              <button className="btn btn-primary" onClick={handlePlaceOrder}>
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
