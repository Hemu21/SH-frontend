import React from 'react'
import "./chatbox.css" 
import { Avatar } from '@mui/material'

export default function ChatBox(props) {
  return (
    < div id={props.id} className='chatboxMain' onClick={(e)=>{window.location.href = `./${props.user}/u/${e.currentTarget.id}`}} >
        <div className="chatboxIcon">
            <Avatar src={props.dp} />
        </div>
        <div className='chatboxAll'>
            <p className='chatboxTitle'>{props.id}</p>
            <p className='chatboxStatus'>{props.status}</p>
        </div>
    </div>
  )
}