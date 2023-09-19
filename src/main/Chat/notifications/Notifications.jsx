import React, { useEffect, useState } from 'react'
import "../../ChatboxBody/chatboxbody.css"
import NotificationItems from './NotificationItems'

export default function Notifications() {
  const _user = window.location.href
  const user_id = _user.slice(_user.lastIndexOf("/")+1)
  const [note,setNote] = useState([])
  const backendURL = process.env.BACKENDURL

useEffect(()=>{  
  fetch(`${backendURL}/users`).then((res)=>res.json().then((ele)=>ele.map((ee)=>{if(user_id+"data"===ee._id){setNote(ee.notification)}})))
  },[])
  const change = (index)=>{
    const newNote = note
    newNote.splice(index,1)
    setNote(newNote)
    fetch(`${backendURL}/update-user`,{
      method:"PUT",
      mode:"cors",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({id:user_id+"data",data:{notification:note}})
    })
    
  }
  
  
  return (
    <div className='chatboxbodyMain' >
      {note.map((ele,i)=>ele.dp&&<div><NotificationItems index={i} data={note} change={change} note={ele.notification} dp={ele.dp} name={ele.user_id}  /></div>)}
    </div>
  )
}
