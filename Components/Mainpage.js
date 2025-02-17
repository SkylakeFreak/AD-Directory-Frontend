"use client";
import React from 'react'
import AD from './AD'
import { useState,useRef } from 'react'
function Mainpage({signedinnotification,setsignedinnotification}) {
  const [orgname,setorgname]=useState("");
  const [username,setusername]=useState("");
    const[tenantname,settenantname]=useState("");
    const[domainname,setdomainname]=useState("");
    const [signinupmode,setsigninupmode]=useState(false);
     const [connectionstring, setconnectionstring] = useState(null);
     const [triggerconenctionstring,settriggerconnectionstring]=useState(false);
  return (
    <div>
        <AD orgname={orgname} setorgname={setorgname} username={username} setusername={setusername} tenantname={tenantname} settenantname={settenantname} domainname={domainname} setdomainname={setdomainname} connectionstring={connectionstring} setconnectionstring={setconnectionstring} signinupmode={signinupmode} setsigninupmode={setsigninupmode} signedinnotifcation={signedinnotification} setsignedinnotification={setsignedinnotification} triggerconenctionstring={triggerconenctionstring} settriggerconnectionstring={settriggerconnectionstring}/>
    </div>

  )
}

export default Mainpage