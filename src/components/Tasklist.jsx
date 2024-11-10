// TaskList.jsx
import React from 'react';
import TodoTasks from './TodoTasks';
import InProgressTasks from './InProgressTasks';
import DoneTasks from './DoneTasks';

const TaskList = ({tasks}) => {
  // const tasks = [
  //   { id: 1, title: 'Task 1', status: 'To Do' },
  //   { id: 2, title: 'Task 2', status: 'In Progress' },
  //   { id: 3, title: 'Task 3', status: 'Done' }
  // ];

  return (
    <div className="bg-black text-white p-4 w-full">
      <div className="flex flex-row space-x-2 ">
      <TodoTasks/>
      <InProgressTasks/>
      <DoneTasks/>
      </div>
    </div>
  );
};

export default TaskList;
