// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white text-center py-4 mt-auto">
      <p>&copy; {new Date().getFullYear()} Task Manager App</p>
    </footer>
  );
};

export default Footer;
