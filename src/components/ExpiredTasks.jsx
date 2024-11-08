// ExpiredTasks.jsx
import React from 'react';

const ExpiredTasks = () => {
  const expiredTasks = [
    { id: 1, title: 'Expired Task 1' },
    { id: 2, title: 'Expired Task 2' }
  ];

  return (
    <div className="bg-black text-white p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Expired Tasks</h2>
      {expiredTasks.map(task => (
        <div key={task.id} className="bg-gray-800 p-3 mb-3 rounded">
          <h4>{task.title}</h4>
        </div>
      ))}
      
    </div>
  );
};

export default ExpiredTasks;
