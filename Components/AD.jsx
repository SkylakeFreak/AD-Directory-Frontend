"use client";
import React, { useEffect, useState, useRef } from "react";
import Signinscreen from "../pages/Signinscreen";
import { useRouter } from "next/navigation";

function AD({ orgname, setorgname, setusername, username, tenantname,settenantname,domainname,setdomainname,connectionstring,
    setconnectionstring,setsigninupmode,signinupmode,signedinnotification,setsignedinnotification,settriggerconnectionstring,triggerconenctionstring }) {
  const router = useRouter();
  const pendingtimeleft = useRef(3);
  const intervalRef = useRef(null);

  useEffect(() => {
    const generateRandomString = (length = 10) => {
      console.log("NEW STRING CREATED")
      return Math.random().toString(36).substring(2, 2 + length);
    };
    setconnectionstring(generateRandomString());
  }, [triggerconenctionstring]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const callthelogsapi=async()=>{
      let domainname1=domainname+"@AD.com"
      const data = {tenantname,domainname1,connectionstring};

      try{
        console.log("called the frontendlogapi")
        const response = await fetch("https://ad-api-backend.vercel.app/frontendstatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        const result = await response.json();

        if (response.status===200){
          settenantname("");
          setdomainname("");
          setsignedinnotification(true);
          settriggerconnectionstring(!triggerconenctionstring);
          setsigninupmode(!signinupmode);
        }

        console.log(result.message)
      }
      catch(err){
        console.log("error fetching the frontendstatusapi"+err)
      }

    }

    intervalRef.current = setInterval(async () => {
      console.log("setinterval called..",domainname+"@AD.com",tenantname,connectionstring)
      if (domainname !== "" && tenantname !== "") {
        callthelogsapi();
      }


      if (orgname !== "" && username !== "") {
        const response = await handleSubmit();

        if (response && response.ok) {
          setTimeout(() => {
            pendingtimeleft.current -= 1;
            if (pendingtimeleft.current === 0) {
              console.log("Will call cron job to delete the state");
              cronjobs();
              clearInterval(intervalRef.current);
            }
          }, 8000);
        } else {
          console.log("Invalid details");
        }
      } else {
        setTimeout(() => {
          setsignedinnotification(false);//turned off the loggged in notification
          
        }, 6000);
        console.log("Called but Not Entered Value");
        console.log(triggerconenctionstring,"triggerconnectionstring")
      }
    }, 10000);

    return () => clearInterval(intervalRef.current);
  }, [orgname, username,tenantname,settenantname,domainname]);

  const handleSubmit = async () => {
    const modifiedUsername = username.includes("@AD.com") ? username : username + "@AD.com";
  const data = { orgname, username: modifiedUsername, connectionstring };

    try {
      const response = await fetch("https://ad-api-backend.vercel.app/frontendfetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      console.log(result.name,result.org, "out");

      if (response.status === 201) {
        console.log("Will login the user");
        console.log("Will Poll once again the user");
        return response;
      } else if (response.status === 200) {
        clearInterval(intervalRef.current);
        router.push("/loggedinscreen");
        return response;
      } else {
        console.log(result.error);
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
    <div className="h-screen flex-col justify-center w-full flex">
      <p className="flex text-2xl items-center w-full animate-pulse p-5">Active Directory</p>
      <div className="flex items-center p-5 justify-center h-full gap-x-10 w-full">
        <Signinscreen
          mainscreentext={"Organization AD"}
          connectionstring={connectionstring || "Generating..."}
          orgname={orgname}
          setorgname={setorgname}
          username={username}
          setusername={setusername}
          pendingtimeleft={pendingtimeleft}
          tenantname={tenantname}
          domainname={domainname}
          settenantname={settenantname}
          setdomainname={setdomainname}
          setconnectionstring={setconnectionstring}
          setsigninupmode={setsigninupmode}
          signinupmode={signinupmode}
          setsignedinnotification={setsignedinnotification}
          signedinnotification={signedinnotification}
        />
        <Signinscreen mainscreentext={"User AD"} status={true} />
      </div>
    </div>
  );
}

export default AD;
