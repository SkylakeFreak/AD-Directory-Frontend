import React, { useEffect, useState } from 'react'

function Notification({notificationString,setnotifcationString,howhot}) {
    const [visibility,setvisibility]=useState(false);
    useEffect(()=>{
        if (notificationString===""){
            //do nothing
        }
        else{
            setvisibility(true)
            const timeout=setTimeout(()=>{
                setvisibility(false);
                setnotifcationString("");

            },3000)

            return ()=>{
                clearTimeout(timeout)
            }

        }

       

    },[notificationString])
  return (
    <div
  className={`absolute top-5 left-1/2 transform -translate-x-1/2 outline ${howhot?"outline-green-500":"outline-red-500"}  outline-1 transition-all duration-600 ease-in-out ${
    visibility ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
  } flex items-center justify-center p-1 bg-black`}
>
  <p className="text-white flex px-6 py-3 items-center justify-center shadow-lg text-sm font-medium">
    {notificationString}
  </p>
  <img className={`${howhot?"flex":"hidden"}`} width="25" height="25" src="https://img.icons8.com/ios-filled/50/40C057/checked-2--v1.png" alt="checked-2--v1"/>
  <img className={`${!howhot?"flex":"hidden"}`} width="25" height="25" src="https://img.icons8.com/ios-filled/50/FA5252/multiply-2.png" alt="multiply-2"/>
</div>

  )
}

export default Notification