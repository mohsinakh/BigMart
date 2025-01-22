import React, { useEffect ,useContext} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingBag,FaShoppingCart } from "react-icons/fa"; // Import Font Awesome icon
import mainContext from "../context/mainContext";
import "./css/Navbar.css"

export default function Navbar() {

  const context = useContext(mainContext)
  const {showAlert} = context
  let location = useLocation();

  useEffect(() => {}, [location]);

  let navigate = useNavigate();

  const handleLogout = () => {
   if(localStorage.getItem('token')) {localStorage.removeItem('token');}
   if(localStorage.getItem('sellertoken')) {localStorage.removeItem('sellertoken');}
    navigate("/login");
  };


  const handleCart = () => {
    
    if (localStorage.getItem('token')) {
      navigate(`/cart`);
      window.scroll(0,0)
    } else {
      navigate("/login");
      showAlert("Login to continue !!", "danger");
    }
  };
  const handleOrders = () => { 
    
    if (localStorage.getItem('token')) {
      navigate(`/orders`);
      window.scroll(0,0)
    } else {
      navigate("/login");
      showAlert("Login to continue !!", "danger");
    }
  };
  const handleSeller = async () => {
    
    navigate("/sellerlogin");
    window.scroll(0,0)
  }
  
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary bg-dark "
      data-bs-theme="dark"
    >
      <div className="container-fluid mx-2">
        <Link className="navbar-brand" to="/">
          BigMart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto  mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/products" ? "active" : ""
                }`}
                aria-current="page"
                to="/products"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
           {localStorage.getItem('sellertoken') && (<><li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/sellerhome" ? "active" : ""
                }`}
                to="/sellerhome"
              >
                SellerHome
              </Link>
            </li>
            </>)}
          </ul>
          {(!localStorage.getItem('token')&&!localStorage.getItem('sellertoken')) && (<>
            <form className="d-flex bm-2" role="search">
              <Link to="/login" className="btn btn-primary mx-1" role="button">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary mx-1" role="button">
                Signup
              </Link>
              <button onClick={handleSeller} className="btn btn-primary mx-1 ">
                Seller
              </button>
            </form></>
          )}
          {localStorage.getItem('sellertoken') && (<>
          <p className="seller-info" style={{color:"white",margin:"12px 10px"}}>Logged in as Seller</p>
          <button onClick={handleLogout} className="btn btn-primary mx-1  bmy-1">
                Logout
              </button></>)}

           {localStorage.getItem('token')&&( <>
              <button className="btn btn-primary mx-1  bmy-1" onClick={handleOrders}>
              <FaShoppingBag className="mr-2" /> Orders
              </button>
              <button className="btn btn-primary mx-1 bmy-1" onClick={handleCart}>
                <FaShoppingCart className="me-2" /> Cart
              </button>
              <button onClick={handleSeller} className="btn btn-primary mx-1  bmy-1">
                Seller
              </button>
              <button onClick={handleLogout} className="btn btn-primary mx-1  bmy-1">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
