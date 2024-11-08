// CompletedTasks.jsx
import React from 'react';
import { FaList, FaCheckCircle, FaSpinner, FaPlusCircle } from 'react-icons/fa';


const CompletedTasks = () => {
  const completedTasks = [
    { id: 1, title: 'Completed Task 1' },
    { id: 2, title: 'Completed Task 2' }
  ];

  return (
    <div className="bg-black text-white p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
      <div className="flex flex-row gap-3 items-center">
      <FaCheckCircle className="text-2xl hover:text-green-500 transition duration-300" />Completed Tasks</div></h2>
      {completedTasks.map(task => (
        <div key={task.id} className="bg-gray-800 p-3 mb-3 rounded">
          <h4>{task.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default CompletedTasks;
