import React from 'react'
import "./chatrecive.css"
import "./chatsend.css"
import "../chatbody.css"
import atob from 'atob';

export default function ChatRecive(props) {
  try{
    if(props.audio){
    const aud = props.audio.slice(12,props.audio.length-2)

      // Decode the Base64 string into binary data
      const binaryData = atob(aud);
  
      // Convert the binary data to an ArrayBuffer
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        view[i] = binaryData.charCodeAt(i);
      }

    const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(blob);
    document.getElementById("chatbodyReciveAudio").className = "chataudio"
    document.getElementById("chatbodyReciveAudio").src=audioUrl
    
    console.info(blob)}
  }catch(err){

  }
  return (
    <div style={{width:"100vw",display:"block",marginTop:"60px"}}>
      <div className='chat-recive-field'>
        <p style={{display:"block",marginRight:"15px",minWidth:"100px"}} >{props.text}</p>
        {props.audio&&<audio id='chatbodyReciveAudio' className='chataudio1' controls />}
        {props.audio&&<br />}
        {props.audio&&<br />}
        <p className="recive-time">{props.time}</p>
      </div>
      <br/>
    </div>
  )
}
