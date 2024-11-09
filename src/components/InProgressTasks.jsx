import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const InProgressTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        const inProgressTasks = response.data.filter(task => task.status === 'In Progress');
        setTasks(inProgressTasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="h-[80vh] flex-shrink-0 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">
        <div className="flex flex-row items-center">
          <FaSpinner className="text-xl animate-spin hover:text-yellow-500 transition duration-100" />
          <p className="ml-2">In-Progress Tasks</p>
        </div>
      </h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task._id} className="border-2 bg-gray-700 p-3 rounded shadow-sm">
            <h3 className="text-lg font-bold text-white">{task.title}</h3>
            <p className="text-gray-400">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgressTasks;
