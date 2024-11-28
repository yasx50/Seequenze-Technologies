import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch completed tasks from the API
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        // API call to get user tasks
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          withCredentials: true, // Include credentials (cookies)
        });

        // Check if response data is an array
        if (Array.isArray(response.data)) {
          // Filter tasks with a "Completed" status
          const completed = response.data.filter(task => task.status === 'Completed');
          setCompletedTasks(completed); // Update state with completed tasks
        } else {
          setError('Invalid response format: Expected an array of tasks.');
        }
      } catch (err) {
        setError('Error fetching completed tasks.');
        console.error('Error fetching completed tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
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
    return <div className="text-center text-white">Loading completed tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-black text-white p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-2xl hover:text-green-500 transition duration-300" />
          Completed Tasks
        </div>
      </h2>
      {completedTasks.length > 0 ? (
        completedTasks.map(task => (
          <div key={task._id} className="bg-gray-800 p-3 mb-3 rounded">
            <h4 className="font-semibold">{task.title}</h4>
            <p className="text-gray-400">Completed on: {formatDate(task.date)}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No completed tasks found.</p>
      )}
    </div>
  );
};

export default CompletedTasks;
