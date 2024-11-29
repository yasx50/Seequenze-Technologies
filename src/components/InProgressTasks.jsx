import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';

const InProgressTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Fetching tasks from the API
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, { withCredentials: true });

        // Handle response structure
        const tasks = Array.isArray(response.data) ? response.data : response.data.tasks || [];
        console.log('API Response:', tasks); // Log the response to inspect the structure

        // Filter tasks with "In Progress" status (case-insensitive)
        const inProgressTasks = tasks.filter(task => (task.status || '').toLowerCase() === 'in progress');
        console.log('Filtered In-Progress Tasks:', inProgressTasks);

        // Update the state with filtered tasks
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
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/update/${taskId}`,
        { status: 'Completed' },
        { withCredentials: true }
      );

      // Remove the task from the "In Progress" list after completion
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
        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks in progress</p>
        ) : (
          tasks.map(task => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default InProgressTasks;
