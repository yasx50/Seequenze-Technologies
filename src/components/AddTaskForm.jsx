import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import axios from 'axios';

const AddTaskForm = ({userId}) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    dueDate: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: task.dueDate
    };

    try {
      // Send data to backend
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks/add`, newTask);
      
      // Display success message
      setSuccessMessage('Task added successfully!');

      // Reset the form
      setTask({
        title: '',
        description: '',
        status: 'To Do',
        dueDate: ''
      });
    } catch (err) {
      console.error('Error:', err);
      setSuccessMessage('Error adding task.');
    }

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-center font-bold text-2xl m-2">
        <div className="flex flex-row items-center gap-2">
          <FaPlusCircle className="text-1xl hover:text-purple-500 transition duration-300" />
          <p>Add New Task</p>
        </div>
      </h1>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-700 text-white p-2 text-center mb-4 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
          className="bg-gray-800 text-white p-2 mb-2 w-full rounded"
        />
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
          className="bg-gray-800 text-white p-2 mb-2 w-full rounded"
        ></textarea>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="bg-gray-800 text-white p-2 mb-2 w-full rounded"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Expired">Expired</option>
        </select>
        Due Date<input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="bg-gray-800 text-white p-2 mb-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-500">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
