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
      async function fetchData() {
        // await fetch(`https://jsonplaceholder.typicode.com/users?username=${formValue.username}`).
        // then(response => response.json()).
        // then(th => console.log(th))
        await fetch(`http://localhost:3062/login/${formValue.username}/${formValue.password}`)
          .then(response => response.json())
          .then(user => {
            if(user.length === 0){
              throw("username or password wrong. 000")
            }
            setData(user[0]);
            console.log(user[0])
            console.log(data, "11111111")
            if (user[0].address.geo.lat.slice(-4) === formValue.password){
              localStorage.setItem("user", JSON.stringify(user[0]));
              console.log("navigate")
              navigate(`/application/${user[0].id}`);
            } else {
              throw("username or password wrong. 111")
            }
            console.log(data, "2222222222222")
            }).catch(err => alert(err))
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