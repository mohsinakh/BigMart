import React, { useContext, useEffect } from 'react';
import OrderProduct from './OrderProduct';
import ReactLoading from 'react-loading';
import orderContext from '../context/orderContext';

const Orders = () => {
  const { orderProducts, fetchOrders, orderloading } = useContext(orderContext);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        await fetchOrders();
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrderData();
    
    // eslint-disable-next-line
  }, []);

  if (orderloading) {
    return (
      <div className="loading-container">
        <ReactLoading type="bars" color="#f96b44" height={100} width={100} />
      </div>
    );
  }

  if (orderProducts.length === 0) {
    return (
      <div className="loading-container">
        <h2 className="text-center">No orders found.</h2>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center my-3">Orders</h2>
      <div className="cart-products">
        <div className="row m-0">
          {orderProducts.map((order) => (
            <div className="col-lg-4 mb-4" key={order._id}>
              <OrderProduct order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
