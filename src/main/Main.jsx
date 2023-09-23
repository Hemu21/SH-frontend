import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import ChatBox from './components/ChatBox'
import CHatBoxHeader from './ChatBoxHeader/CHatBoxHeader'
import "./Chat/ChatBody/chatbody.css"
import { ToastContainer } from 'react-toastify'
import { SocketContext } from '../socketContext'
import VideoCall from './VideoCall/VideoCall'


export default function Main() {
  const [val,setVal] = useState(1);
  const _user = window.location.href
  const backendURL = "https://sh-backend-61my.onrender.com"
  const user_id = _user.slice(_user.lastIndexOf("/")+1)
  const {call, me,callAccepted, answerCall,leaveCall} = useContext(SocketContext)
  const [vid,setVid] = useState(1)

  const changeVid = (e)=>{setVid(e)}
  useEffect(()=>{
    fetch(`${backendURL}/api/v1/update-user`,{
      method:"PUT",
      mode:"cors",
      headers:{
          "Content-type":"application/json"
      },
      body: JSON.stringify({id:user_id+"data",data:{status:"online",location:"chats"}})
  })
  },[])
  
  if(call.isReceivingCall && !callAccepted){
    if(vid===1){
      const ans = window.confirm(`${call.name} is calling.... \n Do you want to accept`)
      if(ans){
        changeVid(2)
      }else{
        changeVid(1)
      }
    }
    else if(vid===2 ){
      console.info("answering..")
      answerCall()
    }
  }
  
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
  function navChange(id,n){
    setVal(n);
    for(var i=1;i<4;i++){
      if(i!==n){
        document.getElementById("navButton"+i).className="navItems";
        document.getElementById('logo'+i).className = "logo1";
        document.getElementById('navContent'+i).className = "navContent";
      }
    }
    if(n===1){
      document.getElementById('logo'+n).className = "logo";
    }else{
      document.getElementById('logo'+n).className = "logo2";
    }
    
    document.getElementById('navContent'+n).className = "navContent1";
    document.getElementById(id).className = 'navItems1';

  }
  let comp;
  if(vid===1){
    comp = <div><Header login="true" /><nav className='navbar' style={{paddingTop:"52px"}} ><button id="navButton1" className='navItems1' onClick={()=>{navChange('navButton1',1)}}><div id='logo1' className='logo'></div><h1 id="navContent1" className='navContent1'>Chat</h1></button><button id="navButton2" className='navItems' onClick={()=>{navChange('navButton2',2)}}><div id='logo2' className='logo1'></div><h1 id="navContent2" className='navContent'>Search</h1></button><button id="navButton3" className='navItems' onClick={()=>{navChange('navButton3',3)}}><div id='logo3' className='logo1'></div><h1 id="navContent3" className='navContent'>Notification</h1></button></nav><CHatBoxHeader opt={val} /></div>
  }else if(vid==2){
    comp = <VideoCall changeFace={changeVid} />
  }

  return (
    <div>
      {comp}
      
    </div>
  );
}
