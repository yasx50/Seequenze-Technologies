import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';

const DoneTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, { withCredentials: true });
        const completedTasks = Array.isArray(response.data?.tasks)
          ? response.data.tasks.filter(task => task.status === 'Completed')
          : [];
        setTasks(completedTasks);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const markAsCompleted = async (taskId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/update/${taskId}`,
        { status: 'Expired' },
        { withCredentials: true }
      );
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      // alert('Task marked as expired!');
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="h-[80vh] w-1/4 flex-shrink-0 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Done Tasks</h2>
      {loading ? (
        <p className="text-gray-400">Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-400">No completed tasks available.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task._id} className="border-2 bg-gray-700 p-3 rounded shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{task.title}</h3>
                <p className="text-gray-400">{task.description}</p>
              </div>
              <button
                onClick={() => markAsCompleted(task._id)}
                className="text-green-500 hover:text-green-400 transition duration-200"
              >
                <FaArrowRight className="text-2xl" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoneTasks;
