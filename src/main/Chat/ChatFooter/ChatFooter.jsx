import React, { useEffect, useMemo, useState } from 'react'
import "./chatfooter.css"
import { AudioRecorder } from 'react-audio-voice-recorder';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import EmojiPicker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import Divider from '@mui/material/Divider';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import MessageIcon from '@mui/icons-material/Message';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Select, TextField } from '@mui/material';


export default function ChatFooter(props) {
  const [status,setStatus] = useState()
  const [location,setLocation] = useState("")

  const _url = window.location.href;
  const url_slice = _url.slice(_url.lastIndexOf("chat/"))
  const user_id = url_slice.slice(5,url_slice.indexOf("/u"))
  const id = _url.slice(_url.lastIndexOf("/")+1)
    fetch("http://localhost:3000/users").then((res)=>res.json().then((ee)=>ee.map((ele)=>{
    if(ele._id===id+"data"){
      setStatus(ele.status)
      setLocation(ele.location)
    }
  })))
  console.info(status)
  const blobToArrayBuffer = (blob, callback) => {
    const reader = new FileReader();
    reader.onload = () => {
      callback(reader.result);
    };
    reader.readAsArrayBuffer(blob);
  };
  const arrayBufferToBase64 = (arrayBuffer) => {
    const uint8Array = new Uint8Array(arrayBuffer);
    const binaryString = String.fromCharCode.apply(null, uint8Array);
    return btoa(binaryString);
  };
  const addAudioElement = (blob) => {
    console.info("addAudioElement")
    if(status){
      let visit = ""
      if(status==="online"){
        if(location===id){
          visit = "blue"
        }else if(location==="chats"){
          visit = "double"
        }
      }else if(status==="offline"){
        visit = "single"
      }
      const arrayBuffer = blobToArrayBuffer(blob,(arrayBuffer) =>{
        // Convert the ArrayBuffer to a base64-encoded string
        const base64String = arrayBufferToBase64(arrayBuffer);
        
        // Construct the BinData object
        const formData = `BinData(0, "${base64String}")`;
        
    console.info(formData)
    console.info(blob)
    
    props.change({from:{sentaudio:formData,time:new Date().toLocaleTimeString(),visited: visit },to:{reciveaudio:formData,time:new Date().toLocaleTimeString()}})
    const url = URL.createObjectURL(blob);
    const audio = document.getElementById("chatbodySendAudio");
    audio.className = "chataudio"
    audio.src = url;
    handleClose()});
    }
  };
  const [language, setLanguage] = React.useState('');

  const handleChangeOpt = (event) => {
    setLanguage(event.target.value);
  };

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    
  const fileInput = React.useRef()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [text,setText] = React.useState("");
  const open = Boolean(anchorEl);
  const [emoji,setEmoji] =React.useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };




  const [anchorElRecord, setAnchorElRecord] = React.useState(null);
  const openRecord = Boolean(anchorElRecord);
  const handleClickRecord = (event) => {
    
    setAnchorElRecord(event.currentTarget);
  };
  const handleCloseRecord = (ele) => {
    if(ele==="start"){
        SpeechRecognition.startListening({language:language})    
  }else{
    SpeechRecognition.stopListening()
    setText(text+transcript)
    resetTranscript()
    setAnchorElRecord(null);
  }}

  const addToBody = ()=>{
    if(status){
    let visit = ""
    if(status==="online"){
      if(location===id){
        visit = "blue"
      }else if(location==="chats"){
        visit = "double"
      }
    }else if(status==="offline"){
      visit = "single"
    }
    props.change({from:{sent:text,time:new Date().toLocaleTimeString(),visited: visit },to:{recive:text,time:new Date().toLocaleTimeString()}})
    
    setText("")}
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  
  return (
    <div>
    <div className='chatfooterMain'>
        <div className='emoji' onClick={()=>{setEmoji(!emoji)}} >
            <EmojiEmotionsIcon fontSize='large' />
        </div>
        <div >
        <TextField size='medium' className='chatfooterText' onChange={(e)=>{setText(e.currentTarget.value)}} value={text} id="chat-footer-text" placeholder="Text Here" multiline maxRows={2} /> 
        </div>
        <div className='emoji' onClick={addToBody} >
            <SendIcon fontSize='large' />
        </div>
        <div className='emoji' onClick={()=>fileInput.current.click()}>
            <AttachFileIcon fontSize='large' />
            <input ref={fileInput} type="file" style={{ display: 'none' }} />
        </div>
        <div className='emoji'  onClick={(e)=>{handleClick(e);setText("")}}>
            <KeyboardVoiceIcon fontSize='large' />
        </div>
        
        <Menu
        anchorEl={anchorEl}
        id="mic-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem >
          <div className='RecordMenu'><AudioRecorder 
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
      showVisualizer="true"
      />Vioce Message</div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClickRecord}>
          <div><MessageIcon /> Text Message</div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <div><CloseIcon /> Close</div> 
        </MenuItem>
      </Menu>


      <Menu
        anchorEl={anchorElRecord}
        id="Record-menu"
        open={openRecord}
        onClose={handleCloseRecord}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem >
          <div className='RecordMenu'>
            <div style={{marginLeft:"100px"}}>
          <Select
          value={language}
          onChange={handleChangeOpt}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Select</em>
          </MenuItem>
          <MenuItem value={"en-US"}>English</MenuItem>
          <MenuItem value={"te-IN"}>Telugu</MenuItem>
          <MenuItem value={"hi-IN"}>Hindi</MenuItem>
        </Select>
        </div>
            <p>Select language you speak</p>
            
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div><Button id="btnStop" size="small" variant="contained" onClick={()=>{handleCloseRecord("")}}>Stop</Button></div>
              <div ><Button size="small" variant="contained" onClick={()=>{handleCloseRecord("start")}}>Start</Button></div>
            </div>
          </div>
        </MenuItem>
        <br />
      </Menu>
    </div>
    {emoji&&<EmojiPicker width={"100%"} height={"400px"} onEmojiClick={(emojiobj)=>{setText(text+emojiobj.emoji)}} />}
    </div>
  )
}
