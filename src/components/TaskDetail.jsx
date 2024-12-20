import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskDetail = () => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchInProgressTask = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, { withCredentials: true });
        
        // Ensure response.data is an array or adjust for the actual structure
        const tasks = Array.isArray(response.data) ? response.data : response.data.tasks || [];

        // Find the first task that is 'In Progress'
        const inProgressTask = tasks.find(task => task.status === 'In Progress');
        setTask(inProgressTask || null); // Set the task if found, otherwise set null
      } catch (err) {
        console.error('Error fetching task:', err);
      }
    };

    fetchInProgressTask();
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
    <div className="bg-black text-white text-2xl font-normal p-4">
      <div className="border-2 rounded-xl p-4">
        <h1 className="text-center font-bold text-2xl mb-4">Ongoing Task</h1>
        {task ? (
          <>
            <h2 className="text-2xl font-semibold">{task.title}</h2>
            <p className="text-gray-400">{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {formatDate(task.dueDate)}</p>
          </>
        ) : (
          <p className="text-gray-400 text-center">No tasks in progress.</p>
        )}
      </div>
    </div>
  );
};

export default TaskDetail;
