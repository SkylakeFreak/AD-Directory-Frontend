"use client";
import React from 'react'
import AD from './AD'
import { useState,useRef } from 'react'
function Mainpage() {
  const [orgname,setorgname]=useState("");
  const [username,setusername]=useState("");
  return (
    <div>
        <AD orgname={orgname} setorgname={setorgname} username={username} setusername={setusername}/>
    </div>

  )
}

export default Mainpage