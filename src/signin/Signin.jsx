import React, { useState } from 'react'
import "./signin.css";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header';
import { Button, TextField } from '@mui/material';


function Signin(){
  const [message, setMessage] = useState('');
  const [genotp,setGenotp] = useState("");

  let signv = "OTP"
  const getId = async (ele) =>{
    const sent = await fetch("http://localhost:3000/sign",{
      method:"POST",
      mode:"cors",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify(ele)
  })
  const send = await fetch("http://localhost:3000/add-user-data",{
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
    const sent = await fetch("http://localhost:3000/users")
    const data =  await sent.json()
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
      const response = await fetch('http://localhost:3000/api/send-otp', {
        method: "POST",
        mode:"cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber:number })
      });

      if (response.ok) {
        setMessage('OTP sent successfully.');
        toast.success(message,{theme:"colored"})
        const res = await response.json()
        setGenotp(res.otp)
      } else {
        const data = await response.json();
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
      if(document.getElementById("signbtn").innerText === "SIGN IN"){
        const Otp = document.getElementById("signin-otp").value;
          if(genotp===Otp){
            getId({email:email,password:password,call_id:"",user_id:user_id,phno:phno}).then((ele)=>
            {
              window.location.href = `./main/chat/${user_id}`
            }).catch((ele)=>{
              toast.error("Error in saving your data",{theme:"colored"})
            })
        }
          else{
            toast.error("Invalid OTP",{theme:"colored"})
          }
      }else{
        handleSendOTP(phno).then(()=>{
          toast.success("otp sent succussfully",{theme:"colored"})
          document.getElementById("otp").className = "s-arrange"
          document.getElementById("signbtn").innerText = "Sign in"
        }).catch((err)=>toast.error("Otp not Sent Check the number you Provide "+err,{theme:"colored"}))
      }
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
          <p>Enter Mobile Number with Country code</p>
          <div id="otp" className='s-arrangeoi'>
            <label className='s-Labelo'>OTP: </label><TextField id="signin-otp" label="OTP" type="password" required />
          </div>
          <div className="s-arrange1">
            <Button id="signbtn" onClick={signf} variant="contained" color="success">OTP</Button>
          </div>
          <div className="s-arrange3">
            <p>Already Registered? <a href='./login'>Login</a></p>
          </div>
        </form>

    </div>
  )
}
export default Signin