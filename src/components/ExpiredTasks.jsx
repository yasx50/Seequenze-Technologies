import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpiredTasks = () => {
  const [expiredTasks, setExpiredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpiredTasks = async () => {
      try {
        // API call to get user tasks
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          withCredentials: true, // Include credentials (cookies)
        });

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          // Filter tasks with a status of 'Expired'
          const expired = response.data.filter(task => task.status === 'Expired');
          setExpiredTasks(expired); // Update state with expired tasks
        } else {
          // If response.data is not an array, set an error
          setError('Invalid response format: Expected an array of tasks.');
        }
      } catch (err) {
        setError('Error fetching expired tasks.');
        console.error('Error fetching expired tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiredTasks();
  }, []); // Empty dependency array ensures it runs once after component mounts

  // Utility to format dates (DD/MM/YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center text-white">Loading expired tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-black text-white p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Expired Tasks</h2>
      {expiredTasks.length === 0 ? (
        <p className="text-gray-400">No expired tasks available.</p>
      ) : (
        expiredTasks.map(task => (
          <div key={task._id} className="bg-gray-800 p-3 mb-3 rounded">
            <h4 className="text-lg font-bold">{task.title}</h4>
            <p className="text-gray-400">{task.description}</p>
            <p className="text-gray-500">Due: {formatDate(task.dueDate)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpiredTasks;
