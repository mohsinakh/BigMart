import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainContext from "../context/mainContext";
import "./css/Login.css"; // Custom CSS for Login page
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const context = useContext(mainContext);
  const { showAlert, credentials, setCredentials, authUser,passwordType,togglePassword } = context;



  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(localStorage.getItem('token')){localStorage.removeItem('token');}
    if(localStorage.getItem('sellertoken')){localStorage.removeItem('sellertoken');
  showAlert('Successfully logged out of seller account','success')}
    await authUser();
    if (localStorage.getItem('token')) {
      navigate("/");
      window.scroll(0, 0);
      showAlert("Logged in Successfully", "success");
    }

  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">
          Login to your <span className="highlighted-text">BigMart</span>{" "}
          account
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
              value={credentials.email}
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
              value={credentials.password}
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
          <p className="mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="link-signup">
              Create a free account here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
