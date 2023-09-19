import React, { useState } from 'react'
import "./search.css"
import SearchIcon from '@mui/icons-material/Search';
import SearchItems from './SearchItems';

export default function Search() {
  const [name,setName] = useState()
  const [allow,setAllow] = useState(false)
  function searchList(){
    setAllow(name)
  }
  return (
    <div>
      <div className='searchMain' ><input className='searchbox' onChange={(e)=>{setName(e.target.value);setAllow(false)}} type='text' /><button className='searchbutton' onClick={searchList} ><SearchIcon /></button></div>
      <div className="searchBody">
        {allow&&<SearchItems name={name} />}
      </div>
    </div>
  )
}
