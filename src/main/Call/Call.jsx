import React from 'react'
import "./call.css"
import { Avatar } from '@mui/material'
import CallEndIcon from '@mui/icons-material/CallEnd';
import VideoCallIcon from '@mui/icons-material/VideoCall';

export default function Call() {
  return (
    <div>
      <div className='callOpt'>
        <div style={{marginTop:"40vh",marginLeft:"36vw"}}><Avatar sx={{width:160,height:160}} /></div>
      </div>
      <div className='callBottom' ><CallEndIcon fontSize='large' /> <VideoCallIcon fontSize='large' /> </div>
    </div>
  )
}
