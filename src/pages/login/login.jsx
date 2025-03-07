import React, { useState } from 'react'
import assets from '../../assets/assets'
import './login.css'
import { signup,login } from '../../config/firebase'
const Login = () => {
  const [currState,setCurrState] = useState("Sign up")
  const [userName,setUserName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const onSubmitHandler=(event)=>{
    event.preventDefault();
    if (currState==="Sign up"){
      signup(userName,email,password); 
    }
    else {
      login(email,password)
    }
  }
  return (
    <div className='login'>
      <img src={assets.logo_big} alt="image" className="logo"></img>
      <form onSubmit={onSubmitHandler} className='login-form'>
        <h2>{currState}</h2>
        {currState ==="Sign up"?< input onChange={(e)=>setUserName(e.target.value)} value={userName} type="text" className='form-input' placeholder='Username' required></input>:null}
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='form-input' placeholder='Email Address' required></input>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='form-input' placeholder='Pasword' required></input>
        <button type="Submit">{currState ==="Sign up"?"Create account":"Login now"}</button>
        <div className='login-term'>
          <input type="checkbox" required/>
            <p>Agree to the terms of use and privacy policy.</p>
          
        </div>
        <div className='login-forgot'>{
          currState === "Sign up"?<p className='login-toggle'>Already have an account?<span onClick={()=>setCurrState("Login")} > Login here</span> </p>:
          <p className='login-toggle'>Create an account?<span onClick={()=>setCurrState("Sign up")} > Click here</span> </p>
        }
          
        </div>
      </form>
    </div>
  )
}

export default Login