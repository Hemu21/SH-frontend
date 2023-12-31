import React, { useContext, useEffect, useMemo, useState } from 'react'
import { SocketContext } from '../../socketContext';
import "./video.css"

export default function UserVideo() {
  const _url = window.location.href;
  const url_slice = _url.slice(_url.lastIndexOf("chat/"))
  const user_id = url_slice.slice(5,url_slice.indexOf("/u"))
  const id = _url.slice(_url.lastIndexOf("/")+1)
  const backendURL = "https://sh-backend-61my.onrender.com"
  const [idData,setIdData] = useState()
  const [idToCall, setIdToCall] = useState('');

  const {name,setName, callAccepted,me, myVideo, userVideo, callEnded, stream,answerCall, callUser } = useContext(SocketContext);  
  
  useEffect( ()=>{
    fetch(`${backendURL}/api/v1/users`).then((res)=>res.json().then((ele)=>ele.map((ee)=>{if(ee._id===id+"data"){ setIdData(ee)};if(ee._id===id){setIdToCall(ee.call_id)}})))
    setName(user_id);

    
  },[])
  useEffect(()=>{
    try{
    if(idData.status==="online"){
      if(idToCall){
      callUser(idToCall)}
      myVideo.current.srcObject = stream;
    }}catch(err){}
  },[idData])
      

    return (
    <div>
      <video playsInline muted ref={myVideo} autoPlay className='videoMainUsers' />
    </div>
  )
}
