import React, { useContext, useEffect } from 'react';
import sellerContext from '../../context/sellerContext';
import '../css/AllOrders.css'; // Import custom CSS file
import { FaTrashAlt } from 'react-icons/fa';
const AllOrders = () => {
  const context = useContext(sellerContext);
  const { fetchAllOrders, AllOrders,removeOrder } = context; // Corrected the variable name

  useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line
  }, []);


  if(AllOrders.length===0){
    return (
      <><div className="all-orders-container">
      <h2 className="text-center">All Orders</h2></div>
      <div className="loading-container">
        <h2 className="text-center">No orders found.</h2>
      </div>
      </>
    );
  }

  return (
    <div className="all-orders-container">
      <h2 className="text-center">All Orders</h2>
      <div className="orders-list">
        {AllOrders.map((order) => (
          <div key={order._id} className="order-item card mb-4">
            <div className="card-body">
              <h3 className="card-title">Order ID: {order._id}</h3>
              <p className="card-text">
                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}
              </p>
              <p className="card-text">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="card-text">
                <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
              </p>
              <p className="card-text">
                <strong>User:</strong> {order.user.name} - {order.user.email}
              </p>
              <p className="card-text">
                <strong>Shipping Address:</strong>
              </p>
              <p className="card-text">
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              <p className="card-text">
                <strong>Products:</strong>
              </p>
              {order.products.map((product, index) => (
                <div key={index} className="product-item">
                  <p className="card-text">
                    <strong>Product Name:</strong> {product.product.pname} {/* Updated here */}
                  </p>
                  <p className="card-text">
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                  
                  
                  {/* Display more product details as needed */}
                </div>
              ))}
              <button className="btn btn-warning btn-sm mt-2 mx-2" onClick={() => removeOrder(order._id)}>
          <FaTrashAlt className="mr-1 " /> Remove Order
        </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
