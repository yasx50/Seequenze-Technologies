import React from 'react';
import { motion } from 'framer-motion';
import Login from './Login';
import Register from './Register';

const ShowLogReg = () => {
  return (
    <div className='text-white flex justify-center items-center min-h-screen'>
      <div className="flex flex-row gap-5">
        
        {/* Animated Login component with smooth effect */}
        <motion.div
          initial={{ opacity: 0, x: -300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 25, 
            duration: 1 
          }}
          whileHover={{
            scale: 1.05, // Slightly zoom in on hover
            boxShadow: "0px 0px 15px rgba(0, 150, 255, 0.8)", // Soft glowing effect
            transition: { duration: 0.3 }
          }}
        >
          <Login />
        </motion.div>

        {/* Animated Register component with smooth effect */}
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 25, 
            duration: 1, 
            delay: 0.2 
          }}
          whileHover={{
            scale: 1.05, // Slightly zoom in on hover
            boxShadow: "0px 0px 15px rgba(0, 150, 255, 0.8)", // Soft glowing effect
            transition: { duration: 0.3 }
          }}
        >
          <Register />
        </motion.div>

      </div>
    </div>
  );
}

export default ShowLogReg;
