import React, { useEffect } from 'react'
import Header from '../Header/Header'
import "./home.css"
import { useState } from 'react'
import Button from '@mui/material/Button';

export default function Home() {
  const image = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoZDXHeBmkqH64BEKXjpbi3kayNosBtOh4aZWs-louMnFB2l7s474BU0nwG-BWR5zbITpZIdqkTfJ0eMagdLhcu9AgVOJbbKxD5LJ5Z828latEQJ0iOTQZHQBzyERiHqdsPraVshZkQOF9omAzVq_w58QvzZ_PqGbnUjzX_ec5jzJ4rJgAH9qDq61m0t4/s320/image1.png")
    
  return (
    <div>
        <div className='homeBody'>
        <img className='homeBody' src={image} alt="back"  />
        <div className="homebtn">
          <Button variant="contained" className='homeBtn' onClick={()=>window.location.href="./login"} >Getting Start</Button>
        </div>
        </div>
    </div>
  )
}
