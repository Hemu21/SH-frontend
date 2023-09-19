import React from 'react'
import Header from "../Header/Header"
import { Button, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import "./myaccount.css"

export default function MyAccount() {
  return (
    <div>
      <Header />
      <div className='myaccountMain'>
        <div style={{textAlign:'center'}}>UserID</div>
        <div >Email <EditIcon onClick={()=>{document.getElementById("userHideA").className==="arrangeAN"?document.getElementById("userHideA").className="arrangeA":document.getElementById("userHideA").className="arrangeAN"}} /></div>
        <div id="userHideA" className='arrangeAN'>
          <label className='LabelA'>EmailID: </label><TextField id="myacccount-email" label="UserID" variant="outlined" />
        </div>
        <div >Password <EditIcon onClick={()=>{document.getElementById("passwordHideA").className==="arrangeAN"?document.getElementById("passwordHideA").className="arrangeAP":document.getElementById("passwordHideA").className="arrangeAN"}} /></div>
        <div id="passwordHideA" className='arrangeAN' >
          <div id="passwordA" >
            <label className='LabelA'>Current: </label><TextField id="myaccount-passwordC" label="Current Password" variant="outlined" />
          </div>
          <div id="passwordCA" >
            <label className='LabelA'>New: </label><TextField id="myaccount-passwordN" label="New Password" variant="outlined" />
          </div>
        </div>
        <div style={{marginLeft:"90px"}}>
        <Button variant="contained" color="success" >Save</Button>
        </div>
      </div>
    </div>
  )
}
