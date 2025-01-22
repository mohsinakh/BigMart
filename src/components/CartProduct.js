// Updated CartProduct.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './css/CartProduct.css';


const CartProduct = ({ cartProduct, handleQuantityChange, handleRemoveFromCart }) => {




  const regularPrice = cartProduct.product.price?.regular || 'N/A';
  const currency = cartProduct.product.price?.currency || 'N/A';
  const totalPrice = (cartProduct.quantity * regularPrice).toFixed(2);

  const handleDropdownChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    handleQuantityChange(cartProduct._id, newQuantity);
  };

  return (
    <div className="cart-product-card">
      <div className="cart-product-image ">
        <img src={cartProduct.product.pimg} alt={cartProduct.product.pname} />
      </div>
      <div className="cart-product-details">
        <h3 className="cart-product-title">{cartProduct.product.pname}</h3>
        <p className="cart-product-description">{cartProduct.product.pdescription}</p>
        <div className="cart-product-price">
          Price: <span className="colored-text">{regularPrice} {currency}</span>
        </div>
        <div className="cart-product-quantity">
          <label htmlFor={`quantity-${cartProduct._id}`}>Quantity: </label>
          <input
            id={`quantity-${cartProduct._id}`}
            type="number"
            className="form-control"
            value={cartProduct.quantity}
            onChange={handleDropdownChange}
            min="1"
          />
        </div>
        <div className="cart-product-total">
          Total: <span className="colored-text">{totalPrice} {currency}</span>
        </div>
        <button className="cart-product-remove-btn" onClick={() => handleRemoveFromCart(cartProduct._id)}>
          Remove <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;