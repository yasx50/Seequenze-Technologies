import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        // API call to get user tasks
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
          withCredentials: true, // Include credentials (cookies)
        });

        // Ensure response.data is an array or adjust based on actual structure
        const tasks = Array.isArray(response.data) ? response.data : response.data.tasks || [];

        // Filter tasks with a "Completed" status
        const completed = tasks.filter(task => task.status === 'Completed');
        setCompletedTasks(completed); // Update state with completed tasks
      } catch (err) {
        console.error('Error fetching completed tasks:', err);
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
