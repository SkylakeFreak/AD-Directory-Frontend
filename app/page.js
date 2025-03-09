"use client";
import Image from "next/image";
import Mainpage from "@/Components/Mainpage";
import { useEffect, useState } from 'react'
import loaderimage from "@/asset/loader.png"
import Sendtest from "@/Components/Sendtest";
import img2 from "@/asset/bgbg.jpg"
import Overlay from "@/Components/Overlay";
import logo from "@/asset/logo.png"
export default function Home() {
  const [signedinnotification,setsignedinnotification]=useState(false);
  const [notificationArray, setNotificationArray] = useState([]);
  
  useEffect(()=>{
    if (notificationArray.length>5){
      setNotificationArray((prev) => prev.slice(-2));
    }

  },[notificationArray])

  useEffect(()=>{
    if(signedinnotification){
      const currentime=new Date();
      setNotificationArray((prev) => [...prev, "SIGNED UP SECURELY AT: "+currentime]);

    }
   

  },[signedinnotification])
  return (
    <div className="relative bg-black h-screen">
      <div className="h-screen flex items-center justify-center">
      <div className="flex justify-center w-screen items-center h-screen bg-blue-500 animate-bg">
      <div className="relative w-14 h-14">
        {/* Background */}
        <div className="absolute w-20 h-20 -ml-4 -mt-4 rounded-lg bg-blue-500 opacity-70 animate-bg"></div>

        {/* Loader Circles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-9 h-9 opacity-0 rotate-[225deg] animate-orbit"
            style={{ animationDelay: `${i * 240}ms` }}
          >
            <div className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-white shadow-md"></div>
          </div>
        ))}
      </div>
    </div>


      </div>
      <div className="relative h-screen hidden">
      <Image className="absolute w-full h-full" src={img2} alt=""/>
      <div className="h-screen flex flex-col
       hover:bg-opacity-80 bg-black bg-opacity-70 absolute z-50 items-center w-[18vw]">
        <p className="text-white cursor-pointer mt-10 text-xl">
          Notifications
        </p>

        {
          notificationArray.map((item,index)=>(
            <div className="text-white relative justify-center flex-col outline outline-1 outline-gray-500 rounded-sm items-center mt-5 m-2 p-3 animate-pulse hover:animate-none hover:cursor-pointer bg-black  h-auto flex" key={index}>
              
              
              <div onClick={() =>
              setNotificationArray(notificationArray.filter((_, i) => i !== index))
            } className="text-sm cursor-pointer absolute top-0 right-0 bg-gray-500 hover:bg-gray-700 m-1">
              <img width="32" height="32" src="https://img.icons8.com/glyph-neue/64/FFFFFF/multiply.png" alt="multiply"/>
            </div>
            <div className="p-2">
            {item}
            </div>

            </div>
          ))
        }
        {/* <div className="text-lg">
        <Overlay setsignedinnotification={setsignedinnotification} signedinnotification={signedinnotification}/>

        </div> */}

      </div>
      {/* <div className="absolute top-0 left-0 h-40 p-2 m-10 flex items-center justify-center w-60 bg-white">
      <Image className="w-60  " src={logo} alt=""/>
      </div> */}
      {/* <div className="absolute flex w-full items-center justify-center transition-all duration-75 opacity-80">
        <div className="p-10 w-80 text-lg">
        <Overlay setsignedinnotification={setsignedinnotification} signedinnotification={signedinnotification}/>

        </div>
      
      </div> */}

      <div className="absolute w-full top-0 left-0">
      <Mainpage singnedinnotification={signedinnotification} setsignedinnotification={setsignedinnotification} setNotificationArray={setNotificationArray}/>
      </div>
      
    {/* <Sendtest/> */}
      

      </div>
      

    </div>
  );
}
