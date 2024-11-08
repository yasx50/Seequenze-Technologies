import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const AddTaskForm = () => {
  // State to store form data
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'To Do',
    dueDate: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle task submission logic here (e.g., send data to backend)
    console.log('Task Submitted:', task);
  };

  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-center font-bold text-2xl m-2">
        <div className="flex flex-row items-center gap-2">
          <FaPlusCircle className="text-1xl hover:text-purple-500 transition duration-300" />
          <p>Add New Task</p>
        </div>
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Title"
          className="bg-gray-800 text-white p-2 mb-2 w-full rounded"
        />

        {/* Description Textarea */}
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
          className="bg-gray-800 text-white p-2 mb-2 w-full rounded"
        ></textarea>

        {/* Status Dropdown */}
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="bg-gray-800 text-white p-2 mb-2 w-full rounded"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Due Date Input */}
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          className="bg-gray-800 text-white p-2 mb-2 w-full rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-500"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
