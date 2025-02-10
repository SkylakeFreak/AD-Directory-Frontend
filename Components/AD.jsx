"use client"
import React from 'react'
import Signinscreen from './Signinscreen'
import { useEffect,useState,useRef } from 'react';
function AD({orgname,setorgname,setusername,username}) {
  
  
  
  const intervalRef = useRef(null);
  const generateRandomString = (length = 10) => {
      return Math.random().toString(36).substring(2, 2 + length);
    };
    
    const [connectionstring,setconnectionstring]=useState("");
  
    useEffect(()=>{
      if (connectionstring==""){
        setconnectionstring(generateRandomString())
      }
      
    },[])


    useEffect(() => {
      if (intervalRef.current) {
          clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(async () => {
        if (orgname !== "" && username !== "") {
          const response = await handleSubmit(); 
    
          if (response.status === 200) { 
          } else {
          }
        } else {
          console.log("Called but Not Entered Value");
        }
      }, 10000);

      return () => clearInterval(intervalRef.current); 
  }, [orgname, username]);



    const handleSubmit = async () => {
      const data={orgname,username};
  
      try {
        const response = await fetch("https://ad-api-backend.vercel.app/frontendfetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
        console.log(response.ok,response,"out")
  
        if (response.ok) {
          return response
          console.log(result.message) 

        } else {
          // Authentication error
          console.log(result.error)
        }
      } catch (err) {
        setError("Error communicating with the server");
        console.error(err);
      }
    };

  return (
    <div className='h-screen flex-col justify-center w-full flex'>
        <p className='flex text-2xl items-center w-full animate-pulse p-5'>Active Directory</p>
        <div className='flex items-center p-5 justify-center h-full gap-x-10 w-full'>
            
            <Signinscreen mainscreentext={"Organization AD"} connectionstring={connectionstring} orgname={orgname} setorgname={setorgname} username={username} setusername={setusername}/>
            <Signinscreen mainscreentext={"User AD"} status={true}/>



        </div>
    </div>
  )
}

export default AD