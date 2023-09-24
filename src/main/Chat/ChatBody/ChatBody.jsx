import React, { useEffect, useRef } from 'react'
import "./chatbody.css"
import ChatRecive from './Components/ChatRecive'
import ChatSend from './Components/ChatSend'

export default function ChatBody(props) {
  const data =  props.data
  const lastElementRef = useRef(null);
  return (
    <div id='chatbody' className='chatbodyMain'>
      <div style={{display:"block"}} >
        { data.map((ele,index)=> ele.sent?ele.sent&&<div style={{width:"100vw"}}  ><div style={{height:"auto",marginTop:"60px"}} tabIndex={index} key={index} ref={index === data.length -1 ? lastElementRef : null} > <ChatSend key={index} text={ele.sent} time={ele.time} tick={ele.visited}  /></div> <br /></div> :ele.recive?ele.recive&& <div> <div tabIndex={index} key={index} ref={index === data.length -1 ? lastElementRef : null} > <ChatRecive key={index} text={ele.recive} time={ele.time} /></div> <br /></div> :ele.sentaudio?ele.sentaudio&&<div style={{width:"100vw"}}  ><div style={{height:"auto",marginTop:"60px"}} tabIndex={index} key={index} ref={index === data.length -1 ? lastElementRef : null} > <ChatSend audio={ele.sentaudio} key={index} time={ele.time} tick={ele.visited}  /></div> <br /></div>:ele.reciveaudio?ele.reciveaudio&& <div> <div tabIndex={index} key={index} ref={index === data.length -1 ? lastElementRef : null} > <ChatRecive audio={ele.reciveaudio} key={index} time={ele.time} /></div> <br /></div>:console.log(""))}
      </div>
    </div>
  )
}
