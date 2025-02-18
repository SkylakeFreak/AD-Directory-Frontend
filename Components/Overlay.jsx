import React from 'react'

function Overlay({signedinnotification,setsignednotification}) {
  return (
    <div  className={`bg-black animate-pulse text-white w-full rounded-md flex ${signedinnotification?"flex":"hidden"} items-center justify-center h-20`}>
        <p>Signed UP Sucessfully</p>

    </div>
  )
}

export default Overlay