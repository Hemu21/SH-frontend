import React, { useState } from 'react'
import "./header.css"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';


export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const backendURL = "https://sh-backend-61my.onrender.com"
  const _url = window.location.href;
  const user_id = _url.slice(_url.lastIndexOf("/")+1)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [image,setImage] = useState()
  fetch(`${backendURL}/api/v1/users`).then((res)=>res.json().then((ele)=>ele.map((ee)=>{if(ee._id===user_id+"data"){setImage(ee.dp)}})))

  return (
    <div className='headerMain'>
      <div className="headerTitle">
        < h1 style={{color:"white",margin:"0px"}}>SH</h1><h1 style={{color:"red",margin:"0px"}}>VideoChat</h1>
      </div>  
        {props.login && <Avatar className='icon' onClick={handleClick} src={image} />}
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        <MenuItem onClick={()=>{handleClose();window.location.href+="/profile"}}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={()=>{handleClose();window.location.href+="/my-account"}}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={(ele)=>{handleClose(ele);window.location.href="/"}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}
