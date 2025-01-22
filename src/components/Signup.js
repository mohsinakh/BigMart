// Signup.js
import React, {  useContext ,useState} from "react";
import { useNavigate } from "react-router-dom";
import mainContext from "../context/mainContext";
import "./css/Signup.css"; // Custom CSS for Signup page
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const Signup = () => {
  const context = useContext(mainContext);
  const { showAlert,credentials,setCredentials,createUser,togglePassword,passwordType } = context;
 
  const [passwordType2, setPasswordType2] = useState("password");


// Hide and show function in password
const togglePassword2 =()=>{
  if(passwordType2==="password")
  {
   setPasswordType2("text")
   return;
  }
  setPasswordType2("password")
}



  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser();
    if(localStorage.getItem('token')){
    navigate("/");
    window.scroll(0,0);
    showAlert("Account created successfully","success");}
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-heading">
          Create an <span className="highlighted-text">BigMart</span> account
        </h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
  <label htmlFor="name" className="form-label">
    <FontAwesomeIcon icon={faUser} className="icon" />
    Full Name
  </label>
  <input
    type="text"
    className="form-control"
    id="name"
    onChange={onChange}
    name="name"
    required
  />
</div>
<div className="form-group">
  <label htmlFor="email" className="form-label">
    <FontAwesomeIcon icon={faEnvelope} className="icon" />
    Email address
  </label>
  <input
    type="email"
    className="form-control"
    id="email"
    onChange={onChange}
    name="email"
    autoComplete="username"
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
    onChange={onChange}
    minLength={8}
    name="password"
    autoComplete="new-password"
    required
  />
  <button type="button" className="toggle-password-btn" onClick={togglePassword}>
  <FontAwesomeIcon icon={passwordType === "password" ? faEye : faEyeSlash} />
</button>
</div>
<div className="form-group">
  <label htmlFor="cpassword" className="form-label">
    <FontAwesomeIcon icon={faLock} className="icon" />
    Confirm Password
  </label>
  <input
    type={passwordType2}
    className="form-control"
    id="cpassword"
    onChange={onChange}
    minLength={8}
    name="cpassword"
    autoComplete="new-password"
    required
  />
  <button type="button" className="toggle-password-btn" onClick={togglePassword2}>
  <FontAwesomeIcon icon={passwordType2 === "password" ? faEye : faEyeSlash} />
</button>
</div>

          <button type="submit" className="btn btn-primary btn-signup">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
