import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/tasks';  // Change to your backend URL

export const getTasks = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const addTask = async (taskData) => {
  const response = await axios.post(`${apiUrl}/add`, taskData);
  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await axios.put(`${apiUrl}/update/${taskId}`, { status });
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${apiUrl}/${taskId}`);
  return response.data;
};
