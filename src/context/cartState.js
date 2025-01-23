import React ,{useState}from 'react'
import cartContext from './cartContext'

const CartState = (props) => {
  const {host} = props;


    const [cartloading, setcartloading] = useState(false)
    const [cartProducts, setcartProducts] = useState([])
   


      // get all Cart Products 
      const getCartProducts  = async () => {
        try {
          setcartloading(true)
          const response = await fetch(`${host}/fetchallproducts`, {
            method: "GET",
              
            headers: {
              "auth-token":localStorage.getItem('token')
            }
          });

          if(!response.ok){
            setcartloading(false)
            throw new Error("No Products in cart");
          }
        const json = await response.json();
        // console.log(json);
        setcartProducts(json)
        setcartloading(false)
      } catch (error) {
          setcartloading(false)
          console.log(error)
          
        }
      };



     //Add to Cart
     const AddtoCart = async (_id) => {
        try {
          setcartloading(true)
          const response = await fetch(`${host}/addtocart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ _id }),
          });
      
          const json = await response.json();
          // console.log(json); // Log the response
          setcartProducts(cartProducts.concat(json));
          setcartloading(false);
          
        } catch (error) {
          console.error(error);
        }
      };


      // Update quantity from Cart  
      const EditCart = async (_id, quantity) => {
        try {
          // setcartloading(true);
          const response = await fetch(`${host}/updatecart/${_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ quantity }),
          });
      
          if (response.ok) {
            // Update cartProducts state with the new quantity
            setcartProducts(prevCartProducts => {
              return prevCartProducts.map(product => {
                if (product._id === _id) {
                  return { ...product, quantity };
                }
                return product;
              });
            });
          } else {
            // Handle non-successful response (e.g., validation errors)
            console.error("Error updating cart:", response.statusText);
          }
          
          // setcartloading(false); // Update loading state
          
        } catch (error) {
          console.error(error);
          // setcartloading(false); // Update loading state in case of error
        }
      };




  // Remove from Cart
  const RemoveFromCart = async (_id) => {
    try {
      // setcartloading(true);
      const response = await fetch(`${host}/removefromcart/${_id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });

      if (response.ok) {
        // Remove the product from cartProducts state
        setcartProducts(prevCartProducts =>
          prevCartProducts.filter(product => product._id !== _id)
        );
      } else {
        // Handle non-successful response
        console.error("Error removing item from cart:", response.statusText);
      }

      // setcartloading(false); // Update loading state

    } catch (error) {
      console.error(error);
      // setcartloading(false); // Update loading state in case of error
    }
  };



  return (
    <cartContext.Provider value={{ cartProducts, cartloading, getCartProducts, AddtoCart, EditCart, RemoveFromCart,setcartProducts }}>
      {props.children}
    </cartContext.Provider>
  );
};

export default CartState;