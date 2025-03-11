import React from 'react'

function Loader() {
  return (
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
  )
}

export default Loader