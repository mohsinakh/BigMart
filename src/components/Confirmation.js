import React from 'react';
import './css/Confirmation.css'; // Import your custom CSS file for styling
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const navigate = useNavigate()
    const handleShopping = () =>{
        navigate("/")
        window.scroll(0, 0)
    }
    const handleAllOrders = () =>{
        navigate("/orders")
        window.scroll(0, 0)
    }
    return (
  
      <div className="confirmation-container">
          
            <div className="confirmation-content">
                <h2>Order Placed Successfully!</h2>
                <p>Your order has been successfully placed. Thank you for shopping with us!</p>
                <p>An email with order details will be sent to you shortly.</p>
                <button className="btn btn-primary " onClick={handleShopping}>Continue Shopping</button>
                <button className="btn btn-primary mx-2" onClick={handleAllOrders}>All Orders</button>
            </div>
        </div>
    
    );
}

export default Confirmation;
