import React, { useContext, useEffect } from 'react';
import sellerContext from '../../context/sellerContext';
import '../css/SellerHome.css'; // Import your custom CSS file
import { useNavigate } from 'react-router-dom';

const SellerHome = () => {
  const context = useContext(sellerContext);

  const { fetchAllUsers, userInfo } = context;
  const navigate = useNavigate();
  const sellerCredentials = JSON.parse(localStorage.getItem('sellerCredentials'));

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // This will log the updated userInfo whenever it changes
    // console.log('userInfo:', userInfo);
  }, [userInfo]);

  const handleOrders = () => {
    // Handle orders logic
    if(localStorage.getItem('sellertoken')){
    navigate("/allorders")}
    else{
      navigate("/sellerlogin")
    }
  };

  return (
    <div className="seller-home-container">
      <h2 className="welcome-heading">Welcome, {sellerCredentials && sellerCredentials.sellerCredentials.email}</h2>
      <h4>All Users </h4>
      <div className="user-info">
        {userInfo.map((user, index) => (
          <div key={index} className="user-info-container">
            <div className="user-info-item">
              <p className="user-name">Name: {user.name}</p>
              <p className="user-email">Email: {user.email}</p>
              {/* Add more user-specific information here */}
            </div>
          </div>
        ))}
      </div>
      <button disabled ={!localStorage.getItem("sellertoken")} onClick={handleOrders} className="btn btn-primary view-orders-btn">
        View All Orders
      </button>
    </div>
  );
};

export default SellerHome;
