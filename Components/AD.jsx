"use client"
import React from 'react'
import Signinscreen from './Signinscreen'
import { useEffect,useState,useRef } from 'react';
import { Socket } from 'engine.io-client';
function AD({orgname,setorgname,setusername,username}) {
  const pendingtimeleft=useRef(3);
  
  
  
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
    
          if (response && response.ok) { 
            setTimeout(() => {
              
              pendingtimeleft.current-=1
              if (pendingtimeleft.current==0){
                console.log("will call cron job to delete the state")
                cronjobs();
                
                clearInterval(intervalRef.current)
              }
              
            }, 8000);
         
            // login the user
          } else {
            console.log("Invalid details")
            //pop up of invalid details
          }
        } else {
          console.log("Called but Not Entered Value");
        }
      }, 10000);

      return () => clearInterval(intervalRef.current); 
  }, [orgname, username]);



    const handleSubmit = async () => {
      const data={orgname,username,connectionstring};
  
      try {
        const response = await fetch("https://ad-api-backend.vercel.app/frontendfetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials:"include",
        });
  
        const result = await response.json();
        console.log(result.message,"out")
  
        if (response.status===201) {
          console.log("Will login the user")
          console.log("Will Poll once again the user")
          return response
          console.log(result.message) 
        

        }

        else if(response.status===200){
          clearInterval(intervalRef.current)
          return response

        }
        
        else {
          // Authentication error
          console.log(result.error)
        }
      } catch (err) {
        console.log(err);
      }
    };
    const cronjobs = async () => {
  
      try {
        await fetch("https://ad-api-backend.vercel.app/api/cron", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className='h-screen flex-col justify-center w-full flex'>
      
        <p className='flex text-2xl items-center w-full animate-pulse p-5'>Active Directory</p>
        <div className='flex items-center p-5 justify-center h-full gap-x-10 w-full'>
            
            <Signinscreen mainscreentext={"Organization AD"} connectionstring={connectionstring} orgname={orgname} setorgname={setorgname} username={username} setusername={setusername} pendingtimeleft={pendingtimeleft}/>
            <Signinscreen mainscreentext={"User AD"} status={true}/>



        </div>
    </div>
  )
}

export default AD