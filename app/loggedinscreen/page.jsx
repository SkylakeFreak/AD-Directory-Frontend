"use client";
import React, { useEffect, useState,useRef } from 'react';
import { useRouter } from "next/navigation";
import {QRCodeSVG} from 'qrcode.react';
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"




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
  const [logoutredgreenstatus,setlogoutredgreenstatus]=useState("");
  const [modeoflogin,setmodeoflogin]=useState("Loading...")
  const intervalRef = useRef(null);
  const [nameofemployee,setname]=useState("");
  const [phonenumber,setphone]=useState("");
  const [personalemailid,setemail]=useState("");
  const [date, setDate] = useState(new Date());
  const [gender,setgender]=useState("");
  const [designation,setdesignation]=useState("");
  const [department,setdepartment]=useState("");
  

  

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
          setmodeoflogin(result.modeoflogin)
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

  const clearcookie = async () => {
    try {
      // First request to verify user status
      const response1 = await fetch("https://ad-api-backend.vercel.app/verifyuserstatusredgreen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      const result1 = await response1.json();
      console.log(result1.message, "test");
  
      setlogoutredgreenstatus(result1.message);
  
      // Use result1.message directly instead of logoutredgreenstatus
      if (result1.message !== "" && !result1.message) {
        const response2 = await fetch("https://ad-api-backend.vercel.app/clearthecookie", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
  
        const result2 = await response2.json();
  
        if (result2.message === true) {
          console.log("Cleared the cookie successfully");
          router.push("/");
        } else {
          console.log("Some error occurred");
          setlogoutredgreenstatus(false);
        }
      }
    } catch (error) {
      console.error("Error in clearcookie function:", error);
    }
  };

  const lowleveluserdatasendaction=async()=>{
    var tweakedname=nameofemployee+"@AD.com"
    const data = {nameofemployee,personalemailid,phonenumber,gender,designation,department,date,orgName:currentorg,adminname:tweakedname,category:"NonAdminLowlevel" };

    try {
      const response = await fetch("https://ad-api-backend.vercel.app/lowleveluserenrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      console.log("LOW LEVEL USER ENROLLMENT",result);
   
  }
  catch(err){
      
  }
}



  if (isAuthenticated === null) {
    return <div className='h-screen bg-black text-white'>Loading..</div>;
  }


  

  return (
    <div className={`flex  ${isAuthenticated!==null ? "hidden":"block"}   relative flex-col bg-[#343434] h-screen text-white`}>
      <div className='flex relative flex-row w-full  text-white'>
      <div className='flex flex-col w-full text-xl m-2 p-1'>
      <p>Welcome User: <span className='font-bold capitalize'>{currentuser}</span></p> 
      <p>Your Organisation: <span className='font-bold capitalize '>{currentorg }</span></p> 
      <p>Your Role: <span className='font-bold capitalize '>{modeoflogin }</span></p> 
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
      
        <QRCodeSVG className='outline outline-2' value={currentorg+"+"+currentuser+"+"+"logout"+"+"+"EMPTYPAYLOAD"+"+"+"could be any"} />
      <button onClick={()=>{
        clearcookie();
      }} className='h-10 p-2 hover:bg-black bg-gray-700 rounded-sm text-white'>Logout</button>
      <div className='gap-1 flex flex-col items-center justify-center'>
      {logoutredgreenstatus==="" && !logoutredgreenstatus&&<p className='text-black-500'>Please Scan the QR</p>}
      {logoutredgreenstatus!=="" && logoutredgreenstatus&&<p className='text-red-500'>Not Scanned the QR</p>}
      {logoutredgreenstatus!==""&& !logoutredgreenstatus&&<p className='text-green-500'>Please Wait..</p>}
      </div>
      

      </div>
    
      
     </div>}

   

     
     </div>

     <div className='bg-[#242423] text-white rounded-sm gap-3 flex flex-col outline outline-1 outline-gray-400 p-1 font-semibold text-md m-5'>
      <p className='text-xl p-1'>New User Enrollments</p>
      <div className='outline outline-1 p-2 outline-gray-400'>
        <p>Current Users Shows here:</p>
      </div>

      <div className='flex flex-col'>
        <p>CRUD Pause Enrollments</p>
        <div className='flex gap-2 outline outline-1 w-80 p-2 m-2 outline-gray-400 flex-col'>
          <Input onChange={(e)=>{
            setname(e.target.value)

          }} className='text-white bg-black m-1' type="text" placeholder='Name of the Employee' />
          <p className="font-normal text-center">EMAIL AUTOFORM: {nameofemployee+"@AD.com"}</p>
          <Input onChange={(e)=>{
            setphone(e.target.value)

          }} className='text-white bg-black m-1' type="tel" placeholder='Phone Number' />
          <Input onChange={(e)=>{
            setemail(e.target.value)

          }} className='text-white bg-black m-1' type="email" placeholder='Personal Email ID' />
          <Popover>
            <p className='text-normal p-1'>DOB</p>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-black text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span className=''>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
          <Input onChange={(e)=>{
            setgender(e.target.value)

          }} className='text-white bg-black m-1' type="text" placeholder='Gender' />

          <Input onChange={(e)=>{
            setdesignation(e.target.value)

          }} className='text-white bg-black m-1' type="text" placeholder='Designation' />
          <Input onChange={(e)=>{
            setdepartment(e.target.value)

          }} className='text-white bg-black m-1' type="text" placeholder='Department' />
          <div className='flex flex-row justify-between'>
          <Button>Clear</Button>
          <Button  onClick={()=>{
            lowleveluserdatasendaction();

          }} >Enroll</Button>
          </div>
        </div>
      </div>

     </div>
    </div>
  );
}

export default Loggedinscreen;
