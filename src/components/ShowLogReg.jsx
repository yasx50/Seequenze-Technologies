import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Login from './Login';
import Register from './Register';

const ShowLogReg = () => {
  const [isRegister, setIsRegister] = useState(true); // Track whether to show Register or Login

  return (
    <div className="text-white flex flex-col justify-center items-center min-h-screen p-5">
      {/* Animated Container */}
      <motion.div
        className="w-full max-w-md p-5 bg-gray-800 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 25,
          duration: 1,
        }}
      >
        {isRegister ? (
          <div>
            <Register />
            <p className="text-center mt-4 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="text-blue-500 hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        ) : (
          <div>
            <Login />
            <p className="text-center mt-4 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="text-blue-500 hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ShowLogReg;
