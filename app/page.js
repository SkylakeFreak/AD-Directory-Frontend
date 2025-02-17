"use client";
import Image from "next/image";
import Mainpage from "@/Components/Mainpage";
import { useState } from 'react'
import Sendtest from "@/Components/Sendtest";
import Overlay from "@/Components/Overlay";
export default function Home() {
  const [signedinnotification,setsignedinnotification]=useState(false);
  return (
    <div className="relative w-full">
      <div className="absolute w-full transition-all duration-75 opacity-80 top-0 left-0">
      <Overlay setsignedinnotification={setsignedinnotification} signedinnotification={signedinnotification}/>
      </div>

      <div className="absolute top-0 left-0">
      <Mainpage singnedinnotification={signedinnotification} setsignedinnotification={setsignedinnotification}/>
      </div>
      
    {/* <Sendtest/> */}
      

    </div>
  );
}
