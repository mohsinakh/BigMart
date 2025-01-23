import React,{useState,useContext} from 'react'
import orderContext from './orderContext';
import cartContext from './cartContext';

const OrderState = (props) => {
  const {host} = props;
    const [orderProducts, setorderProducts] = useState([]);
    const [orderloading, setorderloading] = useState(false);
    const context = useContext(cartContext)
    const { setcartProducts } = context


    const fetchOrders = async () => {
      try {
        setorderloading(true);
        
        const response = await fetch(`${host}/fetchorders`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem('token')
          }
        });
    
        if (!response.ok) {
          throw new Error("No orders found");
        }
    
        const json = await response.json();
        setorderProducts(json);
      } catch (error) {
        console.error(error.message);
        setorderProducts([]);
      } finally {
        setorderloading(false);
      }
    };
    
  
    //  ROUTE 2 : Place Order
    const placeOrder = async (orderData) => {
      try {
        setorderloading(true);
        const response = await fetch(`${host}/placeorder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify(orderData),
        });
  
        const json = await response.json();
  
        if (response.ok) {
          // Order placed successfully
          setcartProducts([]);
          console.log("Order placed successfully");
          return true;
        } else {
          // Handle error response
          const errorData = json.errors ? json.errors : { message: "An error occurred while placing the order." };
          console.error("Order placement error:", errorData);
        }
  
        setorderloading(false);
      } catch (error) {
        console.error("An error occurred while placing the order:", error);
        setorderloading(false);
      }
    };


    //  ROUTE 3 : Cancel Order
  const cancelOrder = async (orderId) => {
    try {
      setorderloading(true);
      const response = await fetch(`${host}/cancelorder/${orderId}`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });

      const json = await response.json();

      if (response.ok) {
        // Order cancelled successfully
        console.log("Order cancelled successfully");

        fetchOrders(); // Refresh orders after cancellation
      } else {
        // Handle error response
        const errorData = json.message ? { message: json.message } : { message: "An error occurred while cancelling the order." };
        console.error("Order cancellation error:", errorData);
      }

      setorderloading(false);
    } catch (error) {
      console.error("An error occurred while cancelling the order:", error);
      setorderloading(false);
    }
  };

  // ROUTE 4 : Remove Order 
  const removeOrder = async (orderId) => {
    try{
        setorderloading(true);
        const response = await fetch(`${host}/removeorder/${orderId}`,{
          method : 'DELETE',
          headers : {
            'auth-token' : localStorage.getItem('token')
          }
        });

        if (response.ok) {
          // Remove the product from orderProducts state
          setorderProducts(prevorderProducts =>
            prevorderProducts.filter(product => product.orderId !== orderId)
          );
          setorderloading(false)
        } else {
          // Handle non-successful response
          console.error("Error removing item from cart:", response.statusText);
          setorderloading(false)
        }
    }
    catch (error) {
      console.error(error);
      // setcartloading(false); // Update loading state in case of error
    }
  };


    return (
        <orderContext.Provider value={{  placeOrder,fetchOrders, orderProducts,orderloading ,cancelOrder,removeOrder}}>
          {props.children}
        </orderContext.Provider>
      );

}

export default OrderState
