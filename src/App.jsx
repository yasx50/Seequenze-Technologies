import { useContext, useEffect, useState } from 'react';
import './App.css';
import TaskList from './components/Tasklist';
import TaskDetail from './components/TaskDetail';
import AddTaskForm from './components/AddTaskForm';
import CompletedTasks from './components/CompletedTask';
import ExpiredTasks from './components/ExpiredTasks';
import Header from './components/Header';
import Footer from './components/Footer';
import ShowLogReg from './components/ShowLogReg';
import { AuthContext } from './AuthContext';
import axios from 'axios';

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Access AuthContext
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]); // Re-fetch data whenever the authentication state changes

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        withCredentials: true,
      });
      setUserData(response.data.user);
      setTasks(response.data.tasks || []); // Set tasks to an empty array if undefined
    } catch (error) {
      setError('Failed to fetch user data');
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black">
      <Header />

      {!isAuthenticated ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-white text-xl mt-10">
              Dominate Your Day, Crush Every Task!
            </h2>
            <div className="flex flex-col space-y-4">
              <ShowLogReg />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:space-x-4 overflow-x-auto p-4">
          <div className="flex flex-col space-y-4 sm:w-1/3 lg:w-1/4">
            {userData ? (
              <AddTaskForm userId={userData._id} />
            ) : (
              <p className="text-white">Loading user data...</p>
            )}
            <CompletedTasks tasks={tasks?.filter((task) => task.status === 'Completed')} />
            <ExpiredTasks tasks={tasks?.filter((task) => task.status === 'Expired')} />
          </div>

          <div className="flex flex-col space-y-4 sm:w-2/3 lg:w-3/4">
            <TaskDetail task={tasks[0]} /> {/* Assuming you want to show details for the first task */}
            <TaskList tasks={tasks} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
