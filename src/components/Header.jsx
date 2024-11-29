import React from 'react';
import axios from 'axios';

const Header = ({ onLogout }) => {
  // Check if token exists (you can adjust the key according to where the token is stored)
  const token = localStorage.getItem('token') || document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

  // Get username from token or backend
  const getUsernameFromToken = () => {
    if (token) {
      // Assuming token is a JWT, you can decode it to get the username (use a JWT decoding library like jwt-decode)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token to get the payload
      return decodedToken.username; // Assuming the username is stored in the token's payload
    }
    return '';
  };

  const username = getUsernameFromToken(); // Get the username

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      console.log(response.data.message); // "Logged out successfully"

      // Remove the token (if stored in localStorage or cookies)
      localStorage.removeItem('token');
      document.cookie = 'token=; Max-Age=-1'; // To delete the cookie (adjust cookie name as needed)

      // Reload the page after successful logout
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-black text-white p-6 shadow-md flex justify-between items-center">
      {/* Conditionally render "Hustler" or the username based on token presence */}
      <h1 className="text-4xl font-bold">
        {token ? `Hey Hustler, ${username}` : 'Hustler'}
      </h1>
      
      {/* Show logout button only if token exists */}
      {token && (
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
