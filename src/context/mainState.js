import React ,{useState}from 'react'
import mainContext from './mainContext'



const MainState = (props) => {

const [loading, setloading] = useState(false)
const [credentials, setCredentials] = useState({email:"",password:""})
const [passwordType, setPasswordType] = useState("password");


// Hide and show function in password
const togglePassword =()=>{
  if(passwordType==="password")
  {
   setPasswordType("text")
   return;
  }
  setPasswordType("password")
}


  //Send Alerts 
  
  const [alert, setAlert] = useState(false);
  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      
      setTimeout(() => {
          setAlert(false);
      }, 2000);
      
  }

    const {host} = props;

    const [products, setproducts] = useState([])
    const [productById, setproductById] = useState()



    //authenticate User 
    const authUser = async () => {
      try {
        const response = await fetch(`${host}/api/auth/login`, {
          method: "POST",
            
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: 'no-referrer-when-downgrade', // Included within the options
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
    
        const json = await response.json();
        
        if (json.success) {
          // Save the authToken and redirect
          localStorage.setItem('token', json.authToken);
          
        } else {
          showAlert("Invalid Credentials", "danger");
        }
      } catch (error) {
        showAlert("An error occurred", "danger");
        console.error("Error:", error);
        // Handle the error appropriately, e.g., show an error alert
      }
    }


    //create a User 
    const createUser = async () =>{

      const { name, email, password, cpassword } = credentials;

      if (password === cpassword) {
        try {
          const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer-when-downgrade",
            body: JSON.stringify({ name, email, password }),
          });
  
          const json = await response.json();
          console.log(json);
  
          if (json.success) {
            localStorage.setItem("token", json.authToken);
          } else {
            showAlert("Invalid Credentials", "danger");
          }
        } catch (error) {
          console.error("Error:", error);
          showAlert("An error occurred", "danger");
        }
      } else {
        showAlert("Passwords do not match", "danger");
      }

    }

    //get all products 
    const getProducts = async () => {
        try {
          setloading(true)
          const response = await fetch(`${host}/api/product/fetchallproducts`, {
          method: "GET",
            
          headers: {
            
          }
        });
        const json = await response.json();
        console.log(json);
        setproducts(json)
        setloading(false)
        } catch (error) {
          console.log(error.message)
          
        }
  
  
      };
    //get product by ID
    const getProductById = async (p_id) => {
        try {
            setloading(true)
          const response = await fetch(`${host}/api/product/fetchproduct/${p_id}`, {
          method: "GET",
            
          headers: {
            "auth-token":localStorage.getItem('token')
          }
        });
        const json = await response.json();
        // console.log(json);
        setproductById(json)
        setloading(false)
        } catch (error) {
          console.log(error.message)
          
        }
  
  
      };

  

    return (
        <mainContext.Provider value={{ loading, alert,productById, products ,getProducts,getProductById ,showAlert,authUser,createUser,credentials,setCredentials , passwordType,setPasswordType, togglePassword}}>
            {props.children}
            
        </mainContext.Provider>
    )
}

export default MainState
