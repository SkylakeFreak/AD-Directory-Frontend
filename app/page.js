"use client";
import Image from "next/image";
import Mainpage from "@/Components/Mainpage";
import { useState } from 'react'
import Sendtest from "@/Components/Sendtest";
import img2 from "@/asset/background3.jpg"
import Overlay from "@/Components/Overlay";
export default function Home() {
  const [signedinnotification,setsignedinnotification]=useState(false);
  return (
    <div className="relative h-screen">
      <Image className="absolute w-full h-full" src={img2} alt=""/>
      <div className="absolute flex w-full items-center justify-center transition-all duration-75 opacity-80">
        <div className="p-10 w-80 text-lg">
        <Overlay setsignedinnotification={setsignedinnotification} signedinnotification={signedinnotification}/>

        </div>
      
      </div>

      <div className="absolute w-full top-0 left-0">
      <Mainpage singnedinnotification={signedinnotification} setsignedinnotification={setsignedinnotification}/>
      </div>
      
    {/* <Sendtest/> */}
      

    </div>
  );
}
