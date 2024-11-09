// CompletedTasks.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        const tasks = response.data.filter(task => task.status === 'Completed');
        setCompletedTasks(tasks);
      } catch (err) {
        console.error('Error fetching completed tasks:', err);
      }
    };

    fetchCompletedTasks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-black text-white p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        <div className="flex flex-row gap-3 items-center">
          <FaCheckCircle className="text-2xl hover:text-green-500 transition duration-300" />
          Completed Tasks
        </div>
      </h2>
      {completedTasks.map(task => (
        <div key={task._id} className="bg-gray-800 p-3 mb-3 rounded">
          <h4 className="font-semibold">{task.title}</h4>
          <p className="text-gray-400">Completed on: {formatDate(task.date)}</p>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
