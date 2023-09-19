import React, { useEffect } from 'react'
import Header from '../Header/Header'
import "./home.css"
import { useState } from 'react'
import Button from '@mui/material/Button';

export default function Home() {
  const [count,setCount] = useState(0)
  const [image,setImage] = useState("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoZDXHeBmkqH64BEKXjpbi3kayNosBtOh4aZWs-louMnFB2l7s474BU0nwG-BWR5zbITpZIdqkTfJ0eMagdLhcu9AgVOJbbKxD5LJ5Z828latEQJ0iOTQZHQBzyERiHqdsPraVshZkQOF9omAzVq_w58QvzZ_PqGbnUjzX_ec5jzJ4rJgAH9qDq61m0t4/s320/image1.png")
    const time = 2000
    useEffect(()=>{
    setInterval(()=>{
      const data=["https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoZDXHeBmkqH64BEKXjpbi3kayNosBtOh4aZWs-louMnFB2l7s474BU0nwG-BWR5zbITpZIdqkTfJ0eMagdLhcu9AgVOJbbKxD5LJ5Z828latEQJ0iOTQZHQBzyERiHqdsPraVshZkQOF9omAzVq_w58QvzZ_PqGbnUjzX_ec5jzJ4rJgAH9qDq61m0t4/s320/image1.png","https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEij_yDNQOc6_YU37AM0yLWHcUjUj655bl-YngRQjU4KBgkvWEXPFnqQYyGMuAp5KXOeHzWtROqMpG6BdMDNPLNgA84_WjzjQ360kBqZ5wtNHa231DXA2nOW9Nysot60en9m_YxLowBg1REh-W3pXLhrdPZCTaCpDEdwYH2BNrpY9cnSMak5LGyBgXqYBTw/s320/image2.png"]  
      setImage(data[count])
      setCount(count+1)
      if(count===1){
        setCount(0)
      }
    },time)},[count])
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
