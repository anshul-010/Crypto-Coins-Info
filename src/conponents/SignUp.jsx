import React, { useState } from 'react'
import "./Login.css"


export let RegisteredUser = [{email:"admin@gmail.com",mobile_no:"0101",password:"admin"}]

const SignUp = () => {
    let user = {
        email:"",
        mobile_no:"",
        password:""
    }
    const [userData,setUserData] = useState([])
    const [AllUser,setAllUser] = useState([{email:"admin@gmail.com",mobile_no:"0101",password:"admin"}])
    RegisteredUser = AllUser;
    function handleChange(e){
        setUserData({...userData,[e.target.name]:e.target.value})
        
    }
    function handleSubmit(e){
        e.preventDefault()
    
       setAllUser([...AllUser,userData])
       RegisteredUser = AllUser
        setUserData(user)
    }
    // console.log(RegisteredUser)

  return (
    <div className='formPage'>
        <form onSubmit={handleSubmit}  className='form' >
            <h1>Sign up</h1>
            <input type="email" placeholder='email' value={userData.email}  name='email' onChange={handleChange} />
            <br />
            <input type="number" placeholder='mobile no.' value={userData.mobile_no} name='mobile_no' onChange={handleChange} />
            <br />
            <input type="password" placeholder='password' value={userData.password} name='password' onChange={handleChange} />
            <br />
            <input type="submit" className='submit'value="Sign up"/>
        </form>
    </div>
  )
}

export default SignUp