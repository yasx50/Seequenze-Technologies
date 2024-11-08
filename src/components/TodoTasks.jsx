// TodoTasks.jsx
import React from 'react';
import { FaList, FaCheckCircle, FaSpinner, FaPlusCircle } from 'react-icons/fa';

const TodoTasks = () => {
  const dummyTasks = [
    { id: 1, title: 'Set up meeting', description: 'Arrange a team meeting by Thursday.' },
    { id: 2, title: 'Complete UI design', description: 'Finish initial drafts of the UI.' },
  ];

  return (
    <div className="h-[80vh] max-w-sm flex-shrink-0 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">
      To-Do Tasks</h2>
      <div className="space-y-4">
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

export default TodoTasks;
