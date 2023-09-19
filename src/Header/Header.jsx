import React from 'react'
import "./header.css"
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='headerMain'>
      <div className="headerTitle">
        <h1 style={{color:"white",margin:"0px"}}>SH</h1><h1 style={{color:"red",margin:"0px"}}>VideoChat</h1>
      </div>  
        {props.login && <Avatar className='icon' onClick={handleClick} alt="default" src="https://i.pinimg.com/736x/ed/46/f0/ed46f0aa9862f435c4f9b300f5ae1625.jpg" />}
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
