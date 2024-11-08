// InProgressTasks.jsx
import React from 'react';
import { FaList, FaCheckCircle, FaSpinner, FaPlusCircle } from 'react-icons/fa';


const InProgressTasks = () => {
  const dummyTasks = [
    { id: 1, title: 'Build Task API', description: 'Develop backend API endpoints.' },
    { id: 2, title: 'Setup database', description: 'Integrate MongoDB for task storage.' },
  ];

  return (
    <div className="h-[80vh]  flex-shrink-0 bg-gray-800 p-4  rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4"> 
        <div className="flex flex-row items-center">
        <FaSpinner className="text-xl animate-spin hover:text-yellow-500 transition duration-100" /><p>In-Progress Tasks</p>
        </div>
      </h2>
      <div className="space-y-4 ">
        {dummyTasks.map(task => (
          <div key={task.id} className="border-2 bg-gray-700 p-3 rounded shadow-sm">
            <h3 className="text-lg font-bold text-white">{task.title}</h3>
            <p className="text-gray-400">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InProgressTasks;
