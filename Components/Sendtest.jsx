"use client";
import React from 'react'
import { useState } from 'react';
function Sendtest() {
    const [store,setstore]=useState("");

    const onsubmit=async (e)=>{
        e.preventDefault();
        try{
            const response=await fetch("https://ad-api-backend.vercel.app/sendsafetystring",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",

                },
                body:JSON.stringify({store}),
            });

            const result=await response.json();
            console.log("Server response",result);
        }catch(error){
            console.error("Error sending data",error);
        }

    }
  return (
    <div>Sendtest
        <form onSubmit={(e)=>{
            onsubmit(e);
        }}>
            <input className='bg-black' onChange={(e)=>{
                setstore(e.target.value)
            }} type="text" />
            <button type='submit'>SEND</button>

        </form>
    </div>
  )
}

export default Sendtest