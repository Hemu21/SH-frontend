import React, { useEffect, useState } from 'react'
import "./notification.css"
import { Avatar } from '@mui/material'
import MissedVideoCallIcon from '@mui/icons-material/MissedVideoCall';
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export default function NotificationItems(props) {
  const [opt,setOpt] = useState(false)
  const [noteValue,setNoteValue] = useState(false)
  const [req,setReq] = useState()
  const [res,setRes] = useState()
  const [reqChat,setReqChat] = useState([])
  const [resChat,setResChat] = useState([])
  const [enter,setEnter] = useState(false)
  const backendURL =  "https://sh-backend-61my.onrender.com"
  const [resName,setResName] = useState()
  const _user = window.location.href
  const user_id = _user.slice(_user.lastIndexOf("/")+1)
  const note = props.note
  const data = props.data
  
    
useEffect(()=>{
  if(note==="VCall"||note==="call"){
    setOpt(true)
  }
  if(note==="requested"){
    setNoteValue(true)
  }
  fetch(`${backendURL}/api/v1/users`).then((res)=>res.json().then((ee)=>ee.map((ele)=>{if(ele._id===user_id+"data"){setRes(ele);setResChat(ele.chats)}})))
  },[])
  const accept = (id,spec)=>{
    
    if(spec==="reject" ){
      props.change(id)
      window.location.reload()
    }
    if(spec==="accept" ){
      props.change(id)
      const newResChat = resChat
      newResChat.push({user_ID: props.name,dp: props.dp,status: "offline",chat:[]})
      setResChat(newResChat)
    
      fetch(`${backendURL}/api/v1/update-user`,{
        method:"PUT",
        mode:"cors",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({id:user_id+"data",data:{chats:resChat}})
      }).then((e)=>window.location.reload())
      
    }
    
  }
  return (
    <div>
        <div className='notificationitemMain'>
            <div style={{margin:"9px"}}><Avatar src={props.dp} /></div>
            <div style={{margin:"10px",fontSize:"22px"}} >{props.name}</div>
            {opt&&<div style={{margin:"10px",position:"absolute",right:"0px"}}>{note==="VCall"?<MissedVideoCallIcon fontSize='large' />:<PhoneMissedIcon fontSize='large' />}</div>}
            {noteValue&&<div id={props.index} style={{margin:"10px",position:"absolute",right:"0px"}}><CloseIcon fontSize='large' onClick={(e)=>{setResName(data[e.currentTarget.parentElement.id].user_id);accept(e.currentTarget.parentElement.id,"reject")}} /> <DoneIcon fontSize='large' onClick={(e)=>{accept(e.currentTarget.id,"accept")}} /> </div>}
        </div>
    </div>
  )
}
