import React, { useContext, useEffect } from 'react'
import CallEndIcon from '@mui/icons-material/CallEnd';
import "./videocall.css"
import { SocketContext } from '../../socketContext';
import Video from './Video';
import UserVideo from './UserVideo';


export default function VideoCall(props) {
  const {leaveCall} = useContext(SocketContext)
  
  return (
    <div style={{overflow:"hidden"}}>
      <div className='videocallOpt'>
        <Video/>
        <div >
          <UserVideo />
        </div>
      </div>
      <div className='videocallBottom'>
        <CallEndIcon onClick={()=>{leaveCall();window.location.reload()}} />
      </div>
      
    </div>
    
  )
}
