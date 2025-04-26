'use client'
import React, { useState } from 'react'
import * as motion from "motion/react-client"

const Page = () => {
  const [col, setCol] = useState("red");
  const box = {
    width: 100,
    height: 100,
    backgroundColor: col,
    borderRadius: 5,
  }
  return (
    <div className="">
      <div className="h-screen"></div>

      <div className=' h-screen flex justify-center items-center'>
        <motion.div
          style={box}
          initial={{ scale: 0 }}
          animate={{ rotate: 720, scale: 1.5 }}
          // whileHover={{ }}
          whileTap={{ scale: 0.98 ,backgroundColor: "blue"  }}
          exit={{ scale: 5 }}
          // transition={{ duration: 1 }}
        />
      </div>
      <div className="h-screen"></div>
    </div>
  )
  
  
}

export default Page
