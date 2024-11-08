import { useState } from 'react';
import './App.css';
import TaskList from './components/Tasklist';
import TaskDetail from './components/TaskDetail';
import AddTaskForm from './components/AddTaskForm';
import CompletedTasks from './components/CompletedTask';
import ExpiredTasks from './components/ExpiredTasks';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="min-h-screen w-full overflow-x-hidden bg-black">
        <Header />
        
        <div className="flex flex-col sm:flex-row sm:space-x-4 overflow-x-auto p-4">
          {/* Container for tasks */}
          <div className="flex flex-col space-y-4 sm:w-1/3 lg:w-1/4">
            <AddTaskForm />
            <CompletedTasks />
            <ExpiredTasks />
          </div>
          
          {/* Task Details and Task List */}
          <div className="flex flex-col space-y-4 sm:w-2/3 lg:w-3/4">
            <TaskDetail />
            <TaskList />
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default App;
