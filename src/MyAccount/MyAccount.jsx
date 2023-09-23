import React, { useState } from 'react'
import Header from "../Header/Header"
import { Button, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import "./myaccount.css"
import { ToastContainer, toast } from 'react-toastify';

export default function MyAccount() {
  
  const _url = window.location.href
  const user_id = _url.slice(_url.indexOf("chat/")+5,_url.lastIndexOf("/"))
  const backendURL = "https://sh-backend-61my.onrender.com"
  const [currentPass,setCurrentPass] = useState() 
  fetch(`${backendURL}/api/v1/users`).then((res)=>res.json().then((ele)=>ele.map((ee)=>{if(ee._id===user_id){setCurrentPass(ee.password)}})))
  const saveEmail = ()=>{
    const email = document.getElementById("myacccount-email").value
    fetch(`${backendURL}/api/v1/update-users`,{
      method:"PUT",
      mode:"cors",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify({id:user_id,data:{email:email}})
    }).then((e)=>{window.location.reload()})
  }
  const savePassword = ()=>{
    const cpass = document.getElementById("myaccount-passwordC").value
    const upass = document.getElementById("myaccount-passwordN").value 
    if(currentPass===cpass){
      fetch(`${backendURL}/api/v1/update-users`,{
        method:"PUT",
        mode:"cors",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({id:user_id,data:{password:upass}})
      }).then((e)=>{window.location.reload()})
    }else{
      toast.error("password not matched",{theme:"colored"})
    }

  }

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className='myaccountMain'>
        <div style={{textAlign:'center'}}>UserID</div>
        <div >Email <EditIcon onClick={()=>{document.getElementById("userHideA").className==="arrangeAN"?document.getElementById("userHideA").className="arrangeA":document.getElementById("userHideA").className="arrangeAN";document.getElementById("userHideB").className==="arrangeAN"?document.getElementById("userHideB").className="arrangeA":document.getElementById("userHideB").className="arrangeAN"}} /></div>
        <div id="userHideA" className='arrangeAN'>
          <label className='LabelA'>EmailID: </label><TextField id="myacccount-email" required label="UserID" variant="outlined" />
        </div>
        <div id="userHideB" className='arrangeAN' style={{margin:"15px 0px 0px 85px"}} >
          <Button variant="contained" onClick={saveEmail} color="success" >Save</Button>
        </div>
        <div >Password <EditIcon onClick={()=>{document.getElementById("passwordHideA").className==="arrangeAN"?document.getElementById("passwordHideA").className="arrangeAP":document.getElementById("passwordHideA").className="arrangeAN"}} /></div>
        <div id="passwordHideA" className='arrangeAN' >
          <div id="passwordA" >
            <label className='LabelA'>Current: </label><TextField id="myaccount-passwordC" required label="Current Password" variant="outlined" />
          </div>
          <div id="passwordCA" >
            <label className='LabelA'>New: </label><TextField id="myaccount-passwordN" required label="New Password" variant="outlined" />
          </div>
          <div style={{margin:"15px 0px 0px 75px"}}>
            <Button variant="contained" onClick={savePassword} color="success" >Save</Button>
          </div>
        </div>
        
      </div>
    </div>
  )
}
