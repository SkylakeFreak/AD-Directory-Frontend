"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import {QRCodeSVG} from 'qrcode.react';



function Signinscreen({mainscreentext,status,connectionstring,orgname,setorgname,username,setusername,pendingtimeleft,
  tenantname,settenantname,domainname,setdomainname,signinupmode,setsigninupmode}) {
  const[organizationname,setorganizationname]=useState("");
  const[masteradminaccountname,setmasteradminaccountname]=useState("");
  const[temptenantname,settemptenantname]=useState("");
  const[tempdomainname,settempdomainname]=useState("")

  
  
  const [glow,setglow]=useState(true);

  return (
    
    <div onMouseLeave={()=>{
      setglow(false)
    }} onMouseEnter={()=>{
      setglow(true)

    }}  className={`flex transition-all shadow-2xl duration-75 p-5 rounded-md hover:cursor-pointer flex-col ${glow ? 'bg-white text-xl' : 'bg-gray-200 text-lg'} ${glow ? 'h-[520px] ' : ''}   items-center h-[500px] w-[400px] outline outline-1`}>
        <p className={`${!glow ? ' flex items-center justify-center h-full text-2xl animate-pulse' : 'text-2xl font-semibold'}`}>{mainscreentext}</p>
        <p className={`${!status ? '' : 'hidden'} font-semibold ${signinupmode ? 'hidden' : ''} text-sm  ${!glow ? 'hidden' : ''}`}>Unique Session ID: <span className='font-bold uppercase text-sm'>{connectionstring}</span></p>

        <p className={`${!signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} text-sm ${!status ? '' : 'hidden'}`}>Identifier: <span className='uppercase font-bold text-sm'>{connectionstring}</span></p>
        
        <div className='h-full flex flex-col gap-2 items-center justify-center'>

        <p className={`${!status ? '' : 'hidden'} font-semibold ${signinupmode ? 'hidden' : ''}   ${!glow ? 'hidden' : ''}`}>Sign in</p>
      
        <p className={`${!status ? '' : 'hidden'} font-semibold ${!signinupmode ? 'hidden' : ''}  ${!glow ? 'hidden' : ''}`}>Sign Up</p>

        
        
        <div className={`flex flex-col justify-center  gap-y-2 ${signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} ${!status ? '' : 'hidden'}`}>
        <input onChange={(e)=>{
          setorganizationname(e.target.value)
          setorgname(e.target.value)
        }} placeholder='Organization Name' className={`outline p-1 outline-1 text-center`}  type="text" />

        <div className='outline outline-1 flex items-center justify-center'>
        <input onChange={(e)=>{
          setmasteradminaccountname(e.target.value)
          setusername(e.target.value)
        }} placeholder='Admin Username' className={`outline outline-none w-40 p-1 outline-1 text-right`}  type="text" />
        <span className='m-1'>@AD.com</span> 
        </div>
        </div>
      
       








<div className={`flex flex-col justify-center  gap-y-2 ${!signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} ${!status ? '' : 'hidden'}`}>
<input onChange={(e)=>{
          settenantname(e.target.value)
          settemptenantname(e.target.value)
        }} placeholder='Tenant Name' className={`outline p-1 outline-1 text-center`}  type="text" />
        <div className='outline outline-1 flex items-center justify-center'>
        <input onChange={(e)=>{
          setdomainname(e.target.value)
          settempdomainname(e.target.value)
        }} placeholder='Domain Name' className={`outline outline-none w-40 p-1 ${!signinupmode ? 'hidden' : ''} text-right `}  type="text" />
        <span className='m-1'>@AD.com.</span> 
        </div>
        
</div>




{/* <input onChange={(e)=>{
          setneworganizationname(e.target.value)
        }} placeholder='New Organization Name' className={`outline ${!signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} ${!status ? '' : 'hidden'}  ml-2 mr-2 p-1 outline-1 text-center`}  type="text" />
        <input onChange={(e)=>{
          setnewmasteradminaccountname(e.target.value)
        }} placeholder='New Admin Username' className={`outline ${!signinupmode ? 'hidden' : ''} ${!glow ? 'hidden' : ''} ${!status ? '' : 'hidden'} p-1 outline-1 text-center`}  type="text" /> */}


        <p className={`${!glow ? 'hidden' : ''} text-sm mt-5`}>Move Out Cursor to Hide Credentials!</p>


        {/* <input onChange={(e)=>{
          setpassword(e.target.value)
        }} placeholder='Password' className={`outline ${!glow ? 'hidden' : ''}  p-1 outline-1 text-center`} type="password" /> */}
        <QRCodeSVG className={`rounded-md ${!glow ? 'hidden' : ''} ${signinupmode ? 'hidden' : ''}  mt-5`} value={organizationname+"+"+masteradminaccountname+"@AD.com"+"+"+"signin"+"+"+connectionstring} />
        <QRCodeSVG className={`rounded-md ${!glow ? 'hidden' : ''} ${!signinupmode ? 'hidden' : ''}  mt-5`} value={temptenantname+"+"+tempdomainname+"@AD.com"+"+"+"signup"+"+"+connectionstring} />

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