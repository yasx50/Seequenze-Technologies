import React from 'react'
import Login from './Login'
import Register from './Register'

const ShowLogReg = () => {
  return (
    <div className='text-white '>
        <div className="flex flex-row gap-5">
        <Login/>
        <Register/>
        </div>
      
    </div>
  )
}

export default ShowLogReg
