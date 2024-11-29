import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';

const TodoTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, { withCredentials: true });

      // Ensure the response structure matches expectations
      if (Array.isArray(response.data.tasks)) {
        const todoTasks = response.data.tasks.filter(task => task.status === 'To Do');
        setTasks(todoTasks);
      } else {
        console.error('Expected an array in response.data.tasks, but received:', response.data.tasks);
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addNewTask = async (newTask) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, newTask, { withCredentials: true });
      setTasks(prevTasks => [...prevTasks, response.data]); // Add the new task to the existing state
    } catch (err) {
      console.error('Error adding new task:', err);
    }
  };

  const moveToInProgress = async (taskId) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/tasks/update/${taskId}`, { status: 'In Progress' }, { withCredentials: true });
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId)); // Remove the task from the current list
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="h-[80vh] max-w-sm flex-shrink-0 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">To-Do Tasks</h2>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks available. Add tasks!</p>
        ) : (
          tasks.map(task => (
            <div key={task._id} className="border-2 bg-gray-700 p-3 rounded shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{task.title}</h3>
                <p className="text-gray-400">{task.description}</p>
              </div>
              <button onClick={() => moveToInProgress(task._id)} className="text-blue-500 hover:text-blue-400 transition duration-200">
                <FaArrowRight className="text-2xl" />
              </button>
            </div>
          ))
        )}
      </div>
      <button
        onClick={() => addNewTask({ title: "New Task", description: "This is a new task", status: "To Do" })}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
      >
        Add New Task
      </button>
    </div>
  );
};

export default TodoTasks;
