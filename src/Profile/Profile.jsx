import React from 'react'
import "./profile.css"
import { Avatar, Button, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import Header from '../Header/Header';


export default function Profile() {
  const profileInput = React.useRef()
  return (
    <div>
      <Header  />
    <div className='profileMain'>
      <div className='profileImg' onClick={()=>profileInput.current.click()}>
        <Avatar sx={{height:160, width:160}} alt="default" src="https://i.pinimg.com/736x/ed/46/f0/ed46f0aa9862f435c4f9b300f5ae1625.jpg" />
        <input ref={profileInput} type="file" style={{ display: 'none' }} />
      </div>
      <br/>
      <div style={{textAlign:'center'}}>UserID <EditIcon onClick={()=>{document.getElementById("userHide").className==="arrangePN"?document.getElementById("userHide").className="arrangeP":document.getElementById("userHide").className="arrangePN"}} /></div>
      <div id="userHide" className='arrangePN'>
        <label className='LabelP'>UserID: </label><TextField id="profile-userid" label="UserID" variant="outlined" />
        <br />
        <div><Button variant="contained" color="success" >Save</Button></div>
      </div>
    </div>
    </div>
  )
}
