"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import {QRCodeSVG} from 'qrcode.react';

function Loggedinscreen({ }) {
  const [logoutpopbutton,setlogoutpopbutton]=useState(false);
  const router = useRouter();
  const [loggedintime, setloggedintime] = useState("Loading...");
  const [currentuser,setcurrentuser]=useState("loading...")
  const [currentorg,setcurrentorg]=useState("loading...")
  const [autologouttime, setautologouttime] = useState("Loading...");
  const [currentsystemtiming, setcurrentsystemtiming] = useState("Loading...");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [logoutpopup,setlogoutpopup]=useState(false);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await fetch("https://ad-api-backend.vercel.app/frontendfetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const result = await response.json();

        if (response.status === 200) {
          setIsAuthenticated(true);
          setloggedintime(new Date(result.ttl * 1000).toLocaleString());
          setautologouttime(new Date(result.exp * 1000).toLocaleString());
          setcurrentorg(result.org)
          setcurrentuser(result.name)
        } else {
          setIsAuthenticated(false);
          router.push("/");
        }
      } catch (err) {
        console.error("Exception occurred or the Token Timed Out");
        setIsAuthenticated(false);
        router.push("/");
      }
    };

    handleSubmit();
  }, [router]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
      });
      setcurrentsystemtiming(now);
    };

    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);



  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }


  

  return (
    <div className='flex relative flex-row'>
      <div className='flex flex-col w-full text-xl m-2 p-1'>
      <p>Welcome User: <span className='font-bold capitalize'>{currentuser}</span></p> 
      <p>Your Organisation: <span className='font-bold capitalize '>{currentorg }</span></p> 
      <p></p>

      </div>
      
      <div className='flex flex-col w-full items-end'> 
        <div className='m-2 p-1 outline outline-2'>
        <p className="">Logged in At: {loggedintime}</p>
      <p>Auto-log Out At: {autologouttime}</p>
      <p>System Timing: {currentsystemtiming}</p>
        </div>
        <button onClick={()=>{
          setlogoutpopup(true)

        }} className='h-10 p-2 m-2 hover:bg-black bg-gray-700 rounded-sm text-white'>Logout Authentication</button>
     </div>



     


     {logoutpopup && <div className='absolute w-full transition-all duration-100 flex items-center justify-center mt-40'>
      
      <div className='bg-gray-200 flex flex-col gap-5 items-center justify-center w-80 h-80'>
        <div className='flex items-center w-80 p-1   absolute top-0 justify-end'>
        <button className='outline outline-1 p-1 m-1 hover:bg-gray-300' onClick={()=>{
        setlogoutpopup(false)
      }}>Cancel</button>
        </div>
      
        <QRCodeSVG className='outline outline-2' value={currentorg+"+"+currentuser+"+"+"logout"+"+"+"EMPTYPAYLOAD"} />
      <button className='h-10 p-2 hover:bg-black bg-gray-700 rounded-sm text-white'>Logout</button>
      <div className='gap-1 flex flex-col items-center justify-center'>
      <p className='text-red-500'>Not Scanned the QR</p>
      <p className='text-green-500'>Please Wait..</p>
      </div>
      

      </div>
    
      
     </div>}

     
     
    </div>
  );
}

export default Loggedinscreen;
