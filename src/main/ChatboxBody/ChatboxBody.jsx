import React, { useEffect, useState,useMemo } from 'react'
import ChatBox from '../components/ChatBox'
import "./chatboxbody.css"

export default function ChatboxBody() {
  const _user = window.location.href
  const [alldata,setAlldata] = useState([])
  const backendURL =  "https://sh-backend-61my.onrender.com"
  const [data,setData] = useState([])
  var status = "";var dp = "";
  const user_id = _user.slice(_user.lastIndexOf("/")+1)
  useEffect(()=>{

    fetch(`${backendURL}/api/v1/users`).then((res)=>res.json().then((ele)=>{ele.map((ee)=>{if(ee._id===user_id+"data"){setData(ee.chats)}});setAlldata(ele)})).catch((err)=>console.info("Error:-"+err))
    
    
    
  
  },[])
  alldata.map((ele)=>{data.map((e)=>{if(e.user_ID+"data"===ele._id){status +=ele.status+"|";dp+=ele.dp+"|"}})})
  const arr= status.split("|")
  const arr1= dp.split("|")
console.info(data)
  return (
    <div className='chatboxbodyMain'>
        {data.map((ele,i) =>ele&&<ChatBox key={i} dp={arr1[i-1]} status={arr[i-1]} user={user_id} id={ele.user_ID} />)}
    </div>
  )
}
