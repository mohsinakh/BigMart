import React, { useState } from 'react';
import sellerContext from './sellerContext';

const SellerState = (props) => {
  const [loading, setLoading] = useState(false);
  const [AllOrders, setAllOrders] = useState([]);


  const [userInfo, setUserInfo] = useState([]);
  const [sellerCredentials, setSellerCredentials] = useState({ email: "", password: "" });

  const {host} = props; // Update with your API host


  // Authenticate Seller for login 
  const authenticateSeller = async () => {
    try {
        setLoading(true)
        
      const response = await fetch(`${host}/loginseller`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer-when-downgrade',
        body: JSON.stringify({
          email: sellerCredentials.email,
          password: sellerCredentials.password,
        }),
      });

      

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('sellerCredentials', JSON.stringify({sellerCredentials}));
        // console.log(JSON.stringify(sellerCredentials))
        
        //save the authToken
        localStorage.setItem('sellertoken', data.authToken);
            
          
      } else {
        console.error(data.error || 'Authentication failed');
      }
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };



  // fetch All User Information 
  const fetchAllUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${host}/fetchallusers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('sellertoken'),
        },
      });

      const users = await response.json();

      if (response.ok) {
        setUserInfo(users)
        // console.log("ok",users)
        // Set users state or perform any other required action
        

      } else {
        console.error(users.error || 'Fetching users failed');
      }
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };



  // Fetch All Orders for Sellers
  const fetchAllOrders = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${host}/fetchallorders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('sellertoken'),
        },
      });

      const orders = await response.json();

      if (response.ok) {
        // Set orders state or perform any other required action
        // console.log('Fetched orders:', orders);
        setAllOrders(orders)
      } else {
        console.error(orders.error || 'Fetching orders failed');
      }
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };
  //Remove Orders 
  const removeOrder = async (orderId) => {
    try{
        setLoading(true)
        const response = await fetch(`${host}/removeorder/${orderId}`,{
          method : 'DELETE',
          headers : {
            'auth-token' : localStorage.getItem('sellertoken')
          }
        });

        if (response.ok) {
          // Remove the product from orderProducts state
          setAllOrders(prevAllOrders =>
            prevAllOrders.filter(product => product.ordereId !== orderId)
          );
          fetchAllOrders();
          setLoading(false)
        } else {
          // Handle non-successful response
          console.error("Error removing item from cart:", response.statusText);
          setLoading(false)
        }
    }
    catch (error) {
      console.error(error);
      // setcartloading(false); // Update loading state in case of error
    }
  };


  return (
    <sellerContext.Provider
      value={{
        loading,
        authenticateSeller,
        sellerCredentials,
        setSellerCredentials,
        fetchAllUsers,
        fetchAllOrders,
        AllOrders,
        userInfo,
        removeOrder
      }}
    >
      {props.children}
    </sellerContext.Provider>
  );
};

export default SellerState;
