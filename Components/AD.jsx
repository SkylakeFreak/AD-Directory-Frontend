"use client"
import React from 'react'
import Signinscreen from './Signinscreen'
function AD() {
  return (
    <div className='h-screen flex-col justify-center w-full flex'>
        <p className='flex text-2xl items-center w-full animate-pulse p-5'>Active Directory</p>
        <div className='flex items-center p-5 justify-center h-full gap-x-10 w-full'>
            
            <Signinscreen mainscreentext={"Organization AD"}/>
            <Signinscreen mainscreentext={"User AD"} status={true}/>


        </div>
    </div>
  )
}

export default AD