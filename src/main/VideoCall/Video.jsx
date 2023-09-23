import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../../socketContext';
import "./video.css"

export default function Video() {
  const _url = window.location.href;
  const url_slice = _url.slice(_url.lastIndexOf("chat/"))
  const backendURL = "https://sh-backend-61my.onrender.com"
  const user_id = url_slice.slice(5,url_slice.indexOf("/u"))
    const { answerCall,name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
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
    return (
    <div style={{width:"100vw",height:"100vh"}}>
        { <video playsInline ref={userVideo} autoPlay className='videoMainUser'  />}
    </div>
  )
}
