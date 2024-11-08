// DoneTasks.jsx
import React from 'react';

const DoneTasks = () => {
  const dummyTasks = [
    { id: 1, title: 'Code Review', description: 'Reviewed code from the last sprint.' },
    { id: 2, title: 'Documentation', description: 'Updated API documentation.' },
  ];

  return (
    <div className="h-[80vh] max-w-sm flex-shrink-0 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Done Tasks</h2>
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

export default DoneTasks;
