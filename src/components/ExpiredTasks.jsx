import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpiredTasks = ({tasks}) => {
  const [expiredTasks, setExpiredTasks] = useState([]);

  useEffect(() => {
    const fetchExpiredTasks = async () => {
      try {
        const response = await axios.get('https://api-01r3.onrender.com/user');
        // Assuming tasks have an 'expirationDate' and status is 'Expired' when expired
        const expired = response.data.filter(task => task.status === 'Expired');
        setExpiredTasks(expired);
      } catch (err) {
        console.error('Error fetching expired tasks:', err);
      }
    };

    fetchExpiredTasks();
  }, []);

  return (
    <div className="bg-black text-white p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Expired Tasks</h2>
      {expiredTasks.length === 0 ? (
        <p className="text-gray-400">No expired tasks available.</p>
      ) : (
        expiredTasks.map(task => (
          <div key={task._id} className="bg-gray-800 p-3 mb-3 rounded">
            <h4 className="text-lg font-bold">{task.title}</h4>
            <p className="text-gray-400">{task.description}</p>
            <p className="text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ExpiredTasks;
