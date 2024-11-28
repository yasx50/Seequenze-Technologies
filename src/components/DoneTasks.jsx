import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';

const DoneTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL}/user`);
        const completedTasks = response.data.filter(task => task.status === 'In Progress');
        setTasks(completedTasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  const markAsCompleted = async (taskId) => {
    try {
      // Update the task's status to "Completed" in the backend
      await axios.put(`http://localhost:5000/api/tasks/update/${taskId}`, { status: 'Completed' });
      // Remove the task from the local state once it's marked as completed
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="h-[80vh] w-1/4 flex-shrink-0 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Done Tasks</h2>
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
    </div>
  );
};

export default DoneTasks;
