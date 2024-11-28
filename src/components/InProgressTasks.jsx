import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';

const InProgressTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`);
        const inProgressTasks = response.data.filter(task => task.status === 'In Progress');
        setTasks(inProgressTasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  const moveToCompleted = async (taskId) => {
    try {
      // Update the task status to "Completed" in the backend
      await axios.put(`http://localhost:5000/api/tasks/update/${taskId}`, { status: 'Completed' });
      // Remove the task from the "In Progress" list
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="h-[80vh] flex-shrink-0 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">
        <div className="flex flex-row items-center">
          <p className="ml-2">In-Progress Tasks</p>
        </div>
      </h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task._id} className="border-2 bg-gray-700 p-3 rounded shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{task.title}</h3>
              <p className="text-gray-400">{task.description}</p>
            </div>
            <button
              onClick={() => moveToCompleted(task._id)}
              className="text-blue-500 hover:text-blue-400 transition duration-200"
            >
              <FaArrowRight className="text-2xl" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgressTasks;
