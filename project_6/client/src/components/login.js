
import React , {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


import '../styles/login.css'
const Login = () => {
    const [formValue, setFormValues] = useState({ username: '', password: '' });
    const [data, setData] = useState();
    const navigate = useNavigate();


    const handleChange = event => {
      const { name, value } = event.target;
      setFormValues(prevState => ({ ...prevState, [name]: value }));
    }

    const handleNavigation = event => {
      console.log(event.target.name)
      if (event.target.name === "up"){
        navigate('/register');
      } else {
        navigate('/login');
      }
    }

    const handleSubmit = event => {
      event.preventDefault();
      const entrance = {
        userName:  formValue.username,
        password:  formValue.password
      }
      async function fetchData() {
        // await fetch(`https://jsonplaceholder.typicode.com/users?username=${formValue.username}`).
        // then(response => response.json()).
        // then(th => console.log(th))
        await fetch('http://localhost:3070/login',
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": `application/json`,
          },
          body: JSON.stringify(entrance), // body data type must match "Content-Type" header
        }
        )
          .then(response => response.json())
          .then(user => {
            if(user.length === 0){
              throw("username or password wrong. 000")
            } else {
              setData(user);
              localStorage.setItem("user", JSON.stringify(user));
              console.log("navigate")
              navigate(`/application/${user.name}`);
            }}).catch(err => alert(err))
      }
      fetchData()

    }




    return (
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
        <form onSubmit={handleSubmit} className="form-box">
          <div class="btn-field">
              <button type="button" class="disable" id="signup" name="up" onClick={handleNavigation}>Sign Up</button>
              <button type="button"  id="signin" name="in" onClick={handleNavigation}>Sign In</button>
          </div>
          <label>
            Username:
            <input type="text"  name="username" className="input-field" value={formValue.username} onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" className="input-field"  value={formValue.password} onChange={handleChange} />
          </label>
          <br />
          <div className="connect">
          <button type="submit" className=" connect">Log in</button>
          </div>
        </form>
        </motion.div>
      );
}

export default Login;  