import React, { useEffect, useState,useMemo } from 'react'
import ChatBox from '../components/ChatBox'
import "./chatboxbody.css"

export default function ChatboxBody() {
  const _user = window.location.href
  const [alldata,setAlldata] = useState([])
  const [data,setData] = useState([])
  var status = ""
  const user_id = _user.slice(_user.lastIndexOf("/")+1)
  useEffect(()=>{

    fetch("http://localhost:3000/users").then((res)=>res.json().then((ele)=>{ele.map((ee)=>{if(ee._id===user_id+"data"){setData(ee.chats)}});setAlldata(ele)})).catch((err)=>console.info("Error:-"+err))
    
    
    
  
  },[])
  alldata.map((ele)=>{data.map((e)=>{if(e.user_ID+"data"===ele._id){status +=ele.status+"|";console.info(ele._id)}})})
  console.info("Info:-"+status)
  const arr= status.split("|")
  console.info("Info:-"+arr)
console.info(data)
  return (
    <div className='chatboxbodyMain'>
        {data.map((ele,i) =>ele&&<ChatBox status={arr[i-1]} user={user_id} id={ele.user_ID} />)}
    </div>
  )
}
