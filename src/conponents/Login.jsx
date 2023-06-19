import React, { useContext, useState } from 'react'
import SignUp, { RegisteredUser } from './SignUp'
import { useNavigate  } from "react-router-dom";
import { AppContext } from '../Context/ContextProvider'
import "./Login.css"



const Login = () => {
    const [isLogin,setIsLogin] = useState(true)
    console.log(RegisteredUser)
    const [userData,setUserData] = useState([])
    const navigate = useNavigate(); 
    const {login,setLogin} =  useContext(AppContext)


    function handleChange(e){
        setUserData({...userData,[e.target.name]:e.target.value})
        
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(userData)
        for(let i=0; i<RegisteredUser.length; i++){
            if(RegisteredUser[i].email==userData.email && RegisteredUser[i].password==userData.password){
                navigate("/");
                setLogin(true)

            }
            else{
                alert(`wrong`)
            }
        }
    }

  return (
    <div  >
       {isLogin?<div className='formPage'>
        <form onSubmit={handleSubmit} className='form' >
            <h1>Log in</h1>
            <input type="email" placeholder='email'  name='email' onChange={handleChange} />
            <br />
            <input type="password" placeholder='password'  name='password' onChange={handleChange} />
            <br />
            <input type="submit" className='submit' value="log in" />
        </form>
       </div>:<SignUp/>}
        <br />
        <button className='bottom-btn' onClick={()=>setIsLogin(!isLogin)} >{isLogin?"Register here":"I have a account."}</button>
    </div>
  )
}

export default Login