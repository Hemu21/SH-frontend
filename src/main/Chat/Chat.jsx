import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import ChatHeader from './ChatHeader/ChatHeader'
import ChatBody from './ChatBody/ChatBody';
import ChatFooter from './ChatFooter/ChatFooter'
import { SocketContext } from '../../socketContext';
import VideoCall from '../VideoCall/VideoCall';

export default function Chat() {
  const [mydata,setMydata] = useState()
  const [revdata,setRevdata] = useState([])
  const [chat,setChat] = useState([])
  const [Index,setIndex] = useState()
  const [uchat,setUChat] = useState([])
  const [face,setFace] = useState(1)
  const [dum,setDum] = useState()
  const backendURL =  "https://sh-backend-61my.onrender.com"
  const _url = window.location.href;
  const url_slice = _url.slice(_url.lastIndexOf("chat/"))
  const user_id = url_slice.slice(5,url_slice.indexOf("/u"))
  const {call, callAccepted,me, answerCall,leaveCall} = useContext(SocketContext)
  console.info(me)
  const load = ()=>setDum(1)
  const changeFace = (e)=>{
    setFace(e)
    load()
  }

  if(call.isReceivingCall && !callAccepted){
    console.info("inside "+me)
    if(face===1){
      const ans = window.confirm(`${call.name} is calling.... \n Do you want to accept`)
      if(ans){
        changeFace(2)
      }else{
        changeFace(1)
      }
    }
    else if(face===2 ){
      console.info("answering..")
      answerCall()
    }
  }
  
  const id = _url.slice(_url.lastIndexOf("/")+1)
  useEffect(()=>{

    fetch(`${backendURL}/api/v1/update-user`,{
      method:"PUT",
      mode:"cors",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify({id:user_id+"data",data:{status:"online",location:id}})
  })
    
  },[])
  if(me){
    fetch(`${backendURL}/api/v1/update-users`,{
        method:"PUT",
        mode:"cors",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify({id:user_id,data:{call_id:me}})
    })
  }
  window.addEventListener("beforeunload",(ev)=>{
    ev.preventDefault();
    fetch(`${backendURL}/api/v1/update-user`,{
      method:"PUT",
      mode:"cors",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify({id:user_id+"data",data:{status:"offline"}})
  }).then((e)=>window.close())
  })
  
  const changechat = (ele)=>{
  if(chat.length===0){
    const newrevdata = revdata;
    newrevdata.push({user_ID: user_id,dp: "https://i.pinimg.com/736x/ed/46/f0/ed46f0aa9862f435c4f9b300f5ae1625.jpg",status: "offline",chat: [ele.to]})
    setRevdata(newrevdata)
      const newchats = chat;
      newchats.push(ele.from);
      setChat(newchats);
      const sent = {chats:mydata}
      const recive = {chats:revdata}
      mydata.map((ele)=>console.info(ele))
      revdata.map((ee)=>console.info(ee))
      fetch(`${backendURL}/api/v1/update-user`,{
        method:"PUT",
        mode:"cors",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({id:user_id+"data",data:sent})
      }).then((e)=>{
        fetch(`${backendURL}/api/v1/update-user`,{
          method:"PUT",
          mode:"cors",
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({id:id+"data",data:recive})
        }).then((e)=>window.location.reload())
      })
  }else{
    const newchats = chat;
    newchats.push(ele.from);
    setChat(newchats);
    const newuchat = uchat
    newuchat.push(ele.to)
    setUChat(newuchat) 
    const sent = {chats:mydata}
    const recive = {chats:revdata}
    mydata.map((ele)=>console.info(ele))
    revdata.map((ee)=>console.info(ee))
    
    fetch(`${backendURL}/api/v1/update-user`,{
      method:"PUT",
      mode:"no-cors",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({id:user_id+"data",data:sent})
    }).then((e)=>{
    fetch(`${backendURL}/api/v1/update-user`,{
      method:"PUT",
      mode:"no-cors",
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({id:id+"data",data:recive})
    }).then((e)=>window.location.reload())})
    
    }
  }
  
    fetch(`${backendURL}/api/v1/users`).then((res)=>res.json().then((ele)=>ele.map((e,i)=>{
      if(e._id===user_id+"data"){
        setMydata(e.chats)
        setIndex(i)
        for (let index = 0; index < e.chats.length; index++) {
          const element = e.chats[index];
          if(element.user_ID===id){
            setChat(element.chat)
          }
        }
      }
      if(e._id===id+"data"){
        setRevdata(e.chats)
        for (let index = 0; index < e.chats.length; index++) {
          const element = e.chats[index];
          if(element.user_ID===user_id){
            setUChat(element.chat)
          }
    
        }
      }
    })))
    
    let comp;
    if(face===1){
      comp = <div style={{height:"100%"}}><ChatHeader changeFace={changeFace}  /><ChatBody data={chat} />{mydata&&<ChatFooter change={changechat} data={chat} />}</div>
    }else if(face===2){
      
      comp = <VideoCall changeFace={changeFace} />
    }
    
  return (
    <div style={{height:"100%"}}>
      {comp}
    </div>
  )
}
