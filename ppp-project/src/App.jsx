// App.js
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import ConfirmationModal from './ConfirmationModal';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = () => {
    const updatedTasks = tasks.filter(task => task !== editingTask);
    setTasks(updatedTasks);
    setShowConfirmation(false);
  };

  const toggleTaskCompletion = (task) => {
    const updatedTasks = tasks.map(t =>
      t === task ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task === editingTask ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} editingTask={editingTask} updateTask={updateTask} />
      <TaskList
        tasks={tasks}
        editTask={editTask}
        deleteTask={() => setShowConfirmation(true)}
        toggleTaskCompletion={toggleTaskCompletion}
      />
      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this task?"
          onCancel={() => setShowConfirmation(false)}
          onConfirm={deleteTask}
        />
      )}
    </div>
  );
};

export default App;
