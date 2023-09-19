import React from 'react'
import "./chatsend.css"
import "../chatbody.css"
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import atob from 'atob';

export default function ChatSend(props) {
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
    document.getElementById("chatbodySendAudio").className = "chataudio"
    document.getElementById("chatbodySendAudio").src=audioUrl
    
    console.info(blob)}
  }catch(err){

  }
  return (
    <div style={{width:"100vw",display:"block",marginTop:"60px"}}>
      <div className='chat-send-field'>
        <p id="send-text-audio" style={{display:"block",marginLeft:"15px",minWidth:"100px"}} >{props.text}</p>
        {props.audio&&<audio id='chatbodySendAudio' className='chataudio1' controls />}
        {props.audio&&<br />}
        {props.audio&&<br />}
        <p className="send-time" >{props.time} <span style={{bottom:"0px",marginLeft:"45px"}}> {props.tick==="single"?console.log("offline"):props.tick==="double"?<DoneAllIcon fontSize="small" />:<DoneAllIcon color="primary" fontSize="small" />}</span> </p>   
        
        </div>
        <br/>
        <br />
    </div>
  )
}
