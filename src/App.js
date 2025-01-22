import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import MainState from './context/mainState';
import ProductDetails from './components/ProductDetails';
import Products from './components/Products';
import Cart from './components/Cart';
import "./App.css";
import CartState from './context/cartState';
import OrderState from './context/OrderState';
import PlaceOrder from './components/PlaceOrder';
import Confirmation from './components/Confirmation';
import Orders from "./components/Orders"
import SellerState from './context/SellerState';
import SellerLogin from './components/Seller/SellerLogin';
import SellerHome from './components/Seller/SellerHome';
import AllOrders from './components/Seller/AllOrders';



const App = ()=>{

  const host = "http://localhost:8000"

 

return(
  <>

  <MainState host={host} >
  <CartState host={host}>
  <OrderState host={host}>
  <SellerState host={host}>


<Router>
          <Navbar />
          <Alert/>
          

            <Routes>
              <Route exact path ="/" element={<Home />}/>
              <Route exact path="/placeOrder" element={<PlaceOrder />} />         
              <Route exact path ="/products" element={<Products />}/>
              <Route exact path ="/login" element={<Login />}/>           
              <Route exact path ="/cart" element={<Cart />}/>  
              <Route exact path ="/about" element={<About/>}/>
              <Route exact path ="/signup" element={<Signup/>}/>
              <Route exact path="/productDetails/" element={<ProductDetails />} />
              <Route exact path="/orders" element={<Orders />} />
              <Route exact path="/confirmation" element={<Confirmation />} />
              <Route exact path="/sellerlogin" element={<SellerLogin />} />
              <Route exact path="/sellerhome" element={<SellerHome />} />
               <Route exact path="/allorders" element={<AllOrders />}/>

             
            </Routes>
      
          
        </Router>
  </SellerState>
  </OrderState>
  </CartState>
  </MainState>
 </>
)
}
export default App