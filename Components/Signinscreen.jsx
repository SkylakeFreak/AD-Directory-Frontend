"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import {QRCodeSVG} from 'qrcode.react';



function Signinscreen({mainscreentext,status,connectionstring,orgname,setorgname,username,setusername}) {
  const[passwordstring,setpasswordstring]=useState("");
  const[organizationname,setorganizationname]=useState("");
  const[neworganizationname,setneworganizationname]=useState("");
  const[masteradminaccountname,setmasteradminaccountname]=useState("");
  const[newmasteradminaccountname,setnewmasteradminaccountname]=useState("");
  const [newusername,setnewusername]=useState("");
  const [newpasswordstring,setnewpasswordstring]=useState("")
  const [signinupmode,setsigninupmode]=useState(false);
  
  
  const [glow,setglow]=useState(false);
  return (
    <div onMouseLeave={()=>{
      setglow(false)
    }} onMouseEnter={()=>{
      setglow(true)

    }}  className={`flex transition-all shadow-2xl duration-75 p-5 rounded-md hover:cursor-pointer flex-col ${glow ? 'bg-white text-xl' : 'bg-gray-200 text-lg'} ${glow ? 'h-[520px] ' : ''}   items-center h-[500px] w-[400px] outline outline-1`}>
        <p className={`${!glow ? ' flex items-center justify-center h-full text-2xl animate-pulse' : 'text-2xl font-semibold'}`}>{mainscreentext}</p>
        <p>Connection: {connectionstring}</p>
        
        <div className='h-full flex flex-col gap-2 items-center justify-center'>

        <p className={`${!status ? '' : 'hidden'} font-semibold ${signinupmode ? 'hidden' : ''}   ${!glow ? 'hidden' : ''}`}>Sign in</p>
        <p className={`${!status ? '' : 'hidden'} font-semibold ${!signinupmode ? 'hidden' : ''}  ${!glow ? 'hidden' : ''}`}>Sign Up</p>
        
        <input onChange={(e)=>{
          setorganizationname(e.target.value)
          setorgname(e.target.value)
        }} placeholder='Organization Name' className={`outline ${signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} ${!status ? '' : 'hidden'}  ml-2 mr-2 p-1 outline-1 text-center`}  type="text" />
        <input onChange={(e)=>{
          setmasteradminaccountname(e.target.value)
          setusername(e.target.value)
        }} placeholder='Admin Username' className={`outline ${signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} ${!status ? '' : 'hidden'} p-1 outline-1 text-center`}  type="text" />


<input onChange={(e)=>{
          setneworganizationname(e.target.value)
        }} placeholder='New Organization Name' className={`outline ${!signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} ${!status ? '' : 'hidden'}  ml-2 mr-2 p-1 outline-1 text-center`}  type="text" />
        <input onChange={(e)=>{
          setnewmasteradminaccountname(e.target.value)
        }} placeholder='New Admin Username' className={`outline ${!signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} ${!status ? '' : 'hidden'} p-1 outline-1 text-center`}  type="text" />


        <p className={`${!glow ? 'hidden' : ''} text-sm mt-5`}>Move Out Cursor to Hide Credentials!</p>


        {/* <input onChange={(e)=>{
          setpassword(e.target.value)
        }} placeholder='Password' className={`outline ${!glow ? 'hidden' : ''}  p-1 outline-1 text-center`} type="password" /> */}
        <QRCodeSVG className={`rounded-md ${!glow ? 'hidden' : ''} ${signinupmode ? 'hidden' : ''}  mt-5`} value={organizationname+"+"+masteradminaccountname+"+"+"signin"+"+"+connectionstring} />
        <QRCodeSVG className={`rounded-md ${!glow ? 'hidden' : ''} ${!signinupmode ? 'hidden' : ''}  mt-5`} value={neworganizationname+"+"+newmasteradminaccountname+"+"+"signup"+"+"+connectionstring} />

        <p className={`${!glow ? 'hidden' : ''} ${signinupmode ? 'hidden' : ''}  text-sm mt-5`}>Scan QR to Login!</p>
        <p className={`${!glow ? 'hidden' : ''} ${!signinupmode ? 'hidden' : ''}  text-sm mt-5`}>Scan QR to Signup!</p>


        <button className={`p-1 hover:bg-gray-300 ${!status ? '' : 'hidden'} rounded-md ${signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} text-sm bg-gray-200 w-40 mt-5`} onClick={()=>{
          setsigninupmode(true);
        }}>Enroll New ?</button>
         <button className={`p-1 hover:bg-gray-300 ${!status ? '' : 'hidden'} rounded-md ${!signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} text-sm bg-gray-200 w-40 mt-5`} onClick={()=>{
          setsigninupmode(false);
        }}>Login</button>

        </div>
        
        
    </div>
  ) 
}

export default Signinscreen