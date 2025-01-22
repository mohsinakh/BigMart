import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import sellerContext from "../../context/sellerContext";
import "../css/Login.css"; // Custom CSS for Seller Login page
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import mainContext from "../../context/mainContext";

const SellerLogin = () => {
  const context = useContext(sellerContext);
  const maincontext = useContext(mainContext);
  const {showAlert,togglePassword,passwordType} = maincontext
  const {  sellerCredentials, setSellerCredentials, authenticateSeller } = context;

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await authenticateSeller();
    if (localStorage.getItem("sellertoken")) {
      // console.log(seller)
      if (localStorage.getItem('token')){
        localStorage.removeItem('token')
      }
      navigate("/sellerhome"); // Redirect to appropriate seller dashboard or page
      window.scroll(0, 0);
      showAlert("Seller Logged in Successfully", "success");
    }
  };

  const onChange = (e) => {
    setSellerCredentials({ ...sellerCredentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">
          Login to your <span className="highlighted-text">Seller</span> account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              value={sellerCredentials.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FontAwesomeIcon icon={faLock} className="icon" />
              Password
            </label>
            <input
              type={passwordType}
              className="form-control"
              id="password"
              name="password"
              autoComplete="true"
              value={sellerCredentials.password}
              onChange={onChange}
              minLength={8}
              required
            />
            <button type="button" className="toggle-password-btn" onClick={togglePassword}>
  <FontAwesomeIcon icon={passwordType === "password" ? faEye : faEyeSlash} />
</button>
          </div>
          <button type="submit" className="btn btn-primary btn-login">
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
