import React from 'react';
import axios from 'axios';

const Header = ({ onLogout }) => {

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      const response = await axios.post('https://api-01r3.onrender.com/api/auth/logout', {}, { withCredentials: true });
      console.log(response.data.message); // "Logged out successfully"

      // Reload the page after successful logout
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-black text-white p-6 shadow-md flex justify-between items-center">
      <h1 className="text-4xl font-bold">Seequenze Technologies</h1>
      
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
