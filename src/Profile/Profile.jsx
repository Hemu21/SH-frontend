import React, { useState } from 'react'
import "./profile.css"
import { Avatar, Button, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Header from '../Header/Header';


export default function Profile() {
  const _url = window.location.href
  const user_id = _url.slice(_url.indexOf("chat/")+5,_url.lastIndexOf("/"))
  const backendURL = "https://sh-backend-61my.onrender.com"
  const [image,setImage] = useState()
  fetch(`${backendURL}/api/v1/users`).then((res)=>res.json().then((ele)=>ele.map((ee)=>{if(ee._id===user_id+"data"){setImage(ee.dp)}})))
  const submitimage = ()=>{
    const dp = document.getElementById("profile-image").value
    fetch(`${backendURL}/api/v1/update-user`,{
      method:"PUT",
      mode:"cors",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify({id:user_id+"data",data:{dp:dp}})
    }).then((e)=>{window.location.reload()})
  }
  return (
    <div>
      <Header  />
    {image&&<div className='profileMain'>
      <div className='profileImg' >
        <Avatar sx={{height:160, width:160}} src={image} />
      </div>
      
      <div style={{textAlign:'center'}}>profile <EditIcon onClick={()=>{document.getElementById("userProfile").className==="arrangePN"?document.getElementById("userProfile").className="arrangeP":document.getElementById("userProfile").className="arrangePN"}} /></div>
      <div id="userProfile" className='arrangePN'>
        <label className='LabelP'>profile: </label><TextField id="profile-image" label="url only" variant="outlined" />
        <br />
        <div><Button variant="contained" color="success" onClick={submitimage} >Save</Button></div>
      </div>
    </div>}
    </div>
  )
}
