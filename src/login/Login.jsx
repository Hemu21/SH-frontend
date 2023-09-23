import React, { useState } from 'react'
import Header from '../Header/Header'
import "./login.css"
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const backendURL =  "https://sh-backend-61my.onrender.com"
  const getIds = async (id,password) =>{
    const sent = await fetch(`${backendURL}/api/v1/users`)
    const data =  await sent.json()
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element._id===id){
        if(element.password===password){
          window.location.href = `./main/chat/${id}`
        }
        else{
          toast.error("password not match",{theme:"colored"})
          break
        }
        break
      }else if(index===data.length-1){
        toast.error("user not found, please signin")
      }    
    }
  }


  function loginVerify(){
    const email = document.getElementById('login-email').value
    const password = document.getElementById("login-password").value
    if(email===""){
      toast.info("email is required.Please Enter",{theme:"colored"})
    }
    else if(password===""){
      toast.info("password is required.Please Enter",{theme:"colored"})
    }
    else{
      getIds(email,password)
    }
  }
  return (
    <div>
        <Header />
        <ToastContainer autoClose={2500} />
        <br /><br />
        <form className='loginForm' >
        <h1 className='login'>Login</h1>
          <div className='arrange'>
            <label className='Label'>UserID: </label><TextField id="login-email" label="User ID" variant="outlined" />
          </div>
          <div className='arrange'>
            <label className='Label1'>Password: </label><TextField id="login-password" label="Password" type="password" autoComplete="current-password" />
          </div>
          <div className="arrange1">
            <Button onClick={loginVerify} variant="contained" color="success">Login</Button>
          </div>
          <div className="arrange3">
            <p>Not Registered? <a href='./signin'>Signin</a></p>
          </div>
        </form>

    </div>
  )
}
