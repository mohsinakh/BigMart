import React, { useContext } from 'react';
import './css/OrderProduct.css'; // Import your custom CSS file
import orderContext from '../context/orderContext';
import { FaTimes ,FaTrashAlt} from 'react-icons/fa'; // Import Font Awesome icon

const OrderProduct = ({ order }) => {
  const { products, totalAmount, shippingAddress, orderDate, status } = order;
  const context = useContext(orderContext);
  const { cancelOrder,removeOrder,fetchOrders } = context;


  return (
    <div className="order-card card">
      <div className="card-body">
        <h3 className="card-title">Order Details</h3>
        <p className="order-date">Order Date: {new Date(orderDate).toLocaleString()}</p>
        <p className={`order-status ${status.toLowerCase()}`}>{status}</p>
        <h4 className="mt-4">Shipping Address</h4>
        <p className="mb-1">Street: {shippingAddress.street}</p>
        <p className="mb-1">City: {shippingAddress.city}</p>
        <p className="mb-1">State: {shippingAddress.state}</p>
        <p className="mb-1">Postal Code: {shippingAddress.postalCode}</p>
        <p className="mb-4">Country: {shippingAddress.country}</p>
        <h4>Products</h4>
        <div className="order-products">
          {products.map((product, index) => {
            return (
              <div key={index} className="order-product card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={product.product.pimg} alt={product.product.pname} className="product-image card-img" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product.product.pname}</h5>
                      <p className="card-text quantity">Quantity: {product.quantity}</p>
                      <p className="card-text">
                        Price: {product.product.price.regular} {product.product.price.currency}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="total-amount mt-4">Total Amount: {totalAmount}</p>
        <button disabled={status.toLowerCase()==="cancelled"} className="btn btn-danger btn-sm mt-2" onClick={() => cancelOrder(order._id)}>
          <FaTimes className="mr-1" /> Cancel Order
        </button>
        <button disabled={!(status.toLowerCase()==="cancelled")} className="btn btn-warning btn-sm mt-2 mx-2" onClick={async () => {
          await removeOrder(order._id);
          fetchOrders();
        }}>
          <FaTrashAlt className="mr-1 " /> Remove Order
        </button>
      </div>
    </div>
  );
};

export default OrderProduct;
