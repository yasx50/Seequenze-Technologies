import { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/Tasklist';
import TaskDetail from './components/TaskDetail';
import AddTaskForm from './components/AddTaskForm';
import CompletedTasks from './components/CompletedTask';
import ExpiredTasks from './components/ExpiredTasks';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';  // Import Register component
import Login from './components/Login';  // Import Login component

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is logged in based on cookie
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const token = cookies.find(cookie => cookie.trim().startsWith('token='));

    if (token) {
      // Token exists, set authenticated state to true
      setIsAuthenticated(true);
    } else {
      // No token, set authenticated state to false
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black">
      <Header />

      {/* If not authenticated, show login/register form */}
      {!isAuthenticated ? (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-white">Please log in or register to access the app</h2>
            <div className="flex flex-col space-y-4">
              <Login />
              <span className="text-white">Or</span>
              <Register />
            </div>
          </div>
        </div>
      ) : (
        // If authenticated, show the task-related components
        <div className="flex flex-col sm:flex-row sm:space-x-4 overflow-x-auto p-4">
          <div className="flex flex-col space-y-4 sm:w-1/3 lg:w-1/4">
            <AddTaskForm />
            <CompletedTasks />
            <ExpiredTasks />
          </div>

          <div className="flex flex-col space-y-4 sm:w-2/3 lg:w-3/4">
            <TaskDetail />
            <TaskList />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
