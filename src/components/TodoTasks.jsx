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
      const response = await axios.get('http://localhost:5000/api/tasks');
      const todoTasks = response.data.filter(task => task.status === 'To Do');
      setTasks(todoTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addNewTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      setTasks(prevTasks => [...prevTasks, response.data]); // Add new task to the existing tasks
    } catch (err) {
      console.error('Error adding new task:', err);
    }
  };

  const moveToInProgress = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/update/${taskId}`, { status: 'In Progress' });
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
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
      {/* This button is just an example for testing */}
      <button onClick={() => addNewTask({ title: "New Task", description: "This is a new task", status: "To Do" })}>
        Add New Task
      </button>
    </div>
  );
};

export default TodoTasks;
