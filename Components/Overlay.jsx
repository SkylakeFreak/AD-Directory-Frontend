import React from 'react'

function Overlay({signedinnotification,setsignednotification}) {
  return (
    <div  className={`bg-black text-white w-full flex ${signedinnotification?"flex":"hidden"} items-center justify-center h-20`}>
        <p>Signed IN Sucessfully</p>

    </div>
  )
}

export default Overlay