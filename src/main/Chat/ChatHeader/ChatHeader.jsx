import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import "./chatHeader.css"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function ChatHeader(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [head,setHead] = useState({})
  const backendURL =  "https://sh-backend-61my.onrender.com"
  const _url = window.location.href
  const url_slice = _url.slice(_url.lastIndexOf("chat/"))
  const user_id = url_slice.slice(5,url_slice.indexOf("/u"))
  const id = _url.slice(_url.lastIndexOf("/")+1)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    fetch(`${backendURL}/api/v1/users`).then((res)=>res.json().then((ele)=>ele.map((e)=>{
      if(e._id===id+"data"){
        setHead(e);
      }
    })))

  return (
    <div className='chatHeaderMain'>        
        < div className='emoji' onClick={()=>{window.location.href=`../../${user_id}`}}>
            <ArrowBackIcon fontSize='large' />
        </div>
        <div className="chatHeaderIcon">
            <Avatar alt="default" src={head.dp} />
        </div>
        <div className='chatHeaderAll'>
            <p className='chatHeaderTitle'>{head.user_id}</p>
            <p className='chatHeaderStatus'>{head.status}</p>
        </div>
        <div className='emoji' onClick={()=>{props.changeFace(2)}}>
            <VideoCallIcon fontSize='large' />
        </div>
        <div className='chatHeaderMenu' onClick={handleClick} >
          <MoreVertIcon fontSize='large' />
        </div>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={(ele)=>{handleClose();window.location.href ="../profile"}}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={(ele)=>{handleClose();window.location.href ="../my-account"}}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={(ele)=>{handleClose();window.location.href ="/"}}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}
