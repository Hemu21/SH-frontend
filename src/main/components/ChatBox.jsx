import React from 'react'
import "./chatbox.css" 
import { Avatar } from '@mui/material'

export default function ChatBox(props) {
  return (
    < div id={props.id} className='chatboxMain' onClick={(e)=>{window.location.href = `./${props.user}/u/${e.currentTarget.id}`}} >
        <div className="chatboxIcon">
            <Avatar alt="default" src="https://i.pinimg.com/736x/ed/46/f0/ed46f0aa9862f435c4f9b300f5ae1625.jpg" />
        </div>
        <div className='chatboxAll'>
            <p className='chatboxTitle'>{props.id}</p>
            <p className='chatboxStatus'>{props.status}</p>
        </div>
    </div>
  )
}