// TaskDetail.jsx
import React from 'react';


const TaskDetail = () => {
  const task = { id: 1, title: 'Task 1', description: 'This is a task description', status: 'To Do' };

  return (
    <div className="bg-black text-white text-2xl font-normalbold p-4">
        <div className="border-2 rounded-xl p-2">
        <h1 className="text-center font-bold text-2xl">Ongoing Tasks</h1>
      <h2 className="text-2xl font-semibold">{task.title}</h2>
      <p className="text-gray-400">{task.description}</p>
      <p>Status: {task.status}</p>
        </div>
        
    </div>
  );
};

export default TaskDetail;
