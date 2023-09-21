import React, { useContext, useEffect } from 'react'
import CallEndIcon from '@mui/icons-material/CallEnd';
import "./videocall.css"
import CallIcon from '@mui/icons-material/Call';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import {Peer} from "simple-peer"
import { SocketContext } from '../../socketContext';
import Video from './Video';
import UserVideo from './UserVideo';



export default function VideoCall(props) {
  const {leaveCall} = useContext(SocketContext)
  
  return (
    <div style={{overflow:"hidden"}}>
      <div className='videocallOpt'>
        <Video/>
      </div>
      <div className='videocallBottom'>
        <CallEndIcon onClick={()=>{leaveCall()}} />
        <CallIcon />
        {<ScreenShareIcon />||<StopScreenShareIcon/>}
      </div>
      
    </div>
    
  )
}
