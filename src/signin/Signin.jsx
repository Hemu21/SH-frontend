import React, { useState } from 'react'
import "./signin.css";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';
import { Button, TextField } from '@mui/material';


function Signin(){
  const [message, setMessage] = useState('');
  const [genotp,setGenotp] = useState("");
  const backendURL =  "https://sh-backend-61my.onrender.com"
  let signv = "OTP"
  const getId = async (ele) =>{
    const sent = await fetch(`${backendURL}/api/v1/sign`,{
      method:"POST",
      mode:"cors",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify(ele)
  })
  const send = await fetch(`${backendURL}/api/v1/add-user-data`,{
      method:"POST",
      mode:"cors",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify(ele)
  })
  if(sent.ok){
    return true
  }
  else{
    return false
  }
  }

  const getIds = async (id) =>{
    const sent = await fetch(`${backendURL}/api/v1/users`)
    const data =  await sent.json()
    console.info(data)
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element._id===id){
        return false
      }
    }
    return true
  }


  const handleSendOTP = async (number) => {
    try {
      // Make an API request to send OTP
      const response = await fetch(`${backendURL}/api/v1/send-otp`, {
        method: "POST",
        mode:"cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber:number })
      });
      
      if (response.ok) {
        setMessage('OTP sent successfully.');
        const res = await response.json()
        setGenotp(res.otp)
      } else {
        const data = await response.json();
        console.info(data)
        setMessage(data.error || 'Failed to send OTP.');
        toast.error(message,{theme:"colored"})
      }
    } catch (error) {
      toast.error("Error sending OTP"+error,{theme:"colored"})
      
    }
  };

  

  function signf(){

    const user_id = document.getElementById("signin-userid").value
    const password =  document.getElementById("signin-password").value
    const email = document.getElementById("signin-email").value
    const phno = document.getElementById("signin-mobileno").value
    getIds(user_id).then((ele)=>{
    if(!ele){
      toast.error("user id already taken",{theme:"colored"})
    }
    else if(phno.length<10){
      toast.info("chech the number",{theme:"colored"})
    }
   else if(password!==document.getElementById("signin-confirm-password").value){
      toast.error("Both passwords entered should be same",{theme:"colored"})
    }else{
       getId({email:email,password:password,call_id:"",user_id:user_id,phno:phno}).then((ele)=>
            {
              window.location.href = `./main/chat/${user_id}`
            }).catch((ele)=>{
              toast.error("Error in saving your data",{theme:"colored"})
            })
    }})  
  }

  return (
    <div>
      <Header />
        <ToastContainer autoClose={2500} />
        <h1 className='signin'>Sign in</h1>
        <form className='signinForm' >
        <div className='s-arrange'>
            <label className='s-Labelu'>UserID: </label><TextField id="signin-userid" label="User ID" variant="outlined" required />
          </div>
          <div className='s-arrange'>
            <label className='s-Label'>Email: </label><TextField id="signin-email" label="Email" variant="outlined" required />
          </div>
          <div className='s-arrange'>
            <label className='s-Label1'>Password: </label><TextField id="signin-password" label="Password" type="password" autoComplete="current-password" required />
          </div>
          <div className='s-arrange'>
            <label className='s-Label2'>ConfirmPassword: </label><TextField id="signin-confirm-password" label="Confirm Password" type="password" autoComplete="current-password" required />
          </div>
          <div className='s-arrange'>
            <label className='s-Labelm'>MobileNo: </label><TextField id="signin-mobileno" label="Mobile Number" type="text" placeholder="+916473722786" required />
          </div>
          <div className="s-arrange1">
            <Button id="signbtn" onClick={signf} variant="contained" color="success">SignIn</Button>
          </div>
          <div className="s-arrange3">
            <p>Already Registered? <a href='./login'>Login</a></p>
          </div>
        </form>

    </div>
  )
}
export default Signin
