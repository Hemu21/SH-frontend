import React, { useEffect, useState } from 'react'
import "./searchitem.css"
import { Avatar, stepIconClasses } from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function SearchItems(props) {
  const [mydata,setMydata] = useState()
  const [icon,setIcon] = useState(false)
  const [searchData,setSearchData] = useState()
  const [searchNote,setSearchNote] = useState([])
  const _user = window.location.href
  const user_id = _user.slice(_user.lastIndexOf("/")+1)
  fetch("http://localhost:3000/users").then((res)=>res.json().then((ele)=>ele.map((ee)=>{if(props.name+"data"===ee._id){setSearchData(ee);setSearchNote(ee.notification);ee.notification.map((e)=>{if(e.user_id===user_id){setIcon(true)}})};if(user_id+"data"===ee._id){setMydata(ee);ee.chats.map((e)=>{if(e.user_ID===props.name){setIcon(true)}})}})))

  const request =()=>{
    const newSearchNote = searchNote
    newSearchNote.push({user_id:user_id,dp:mydata.dp,notification:"requested"})
    setSearchNote(newSearchNote)
    fetch("http://localhost:3000/update-user",{
      method:"PUT",
      mode:"cors",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({id:props.name+"data",data:{notification:searchNote}})
    })
  }

  return (
    <div className='searchitemMain'>
        {searchData&&< div style={{margin:"9px"}}>{<Avatar src={searchData.dp} />}</div>}
        {searchData&&<div style={{margin:"10px",fontSize:"22px"}} >{props.name}</div>}
        {searchData&&<div style={{margin:"10px",position:"absolute",right:"0px"}}>{icon?<AddTaskIcon  fontSize="large" />:<AddCircleOutlineIcon onClick={(e)=>{request()}} fontSize='large' />}</div>}
    </div>
  )
}
