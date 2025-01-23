import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../store';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const location = useLocation();

  const filterTasks = () => {
    let filteredTasks = tasks;

    switch (location.pathname) {
      case '/important':
        filteredTasks = tasks.filter(task => task.important);
        break;
      case '/today':
        const today = new Date().toISOString().split('T')[0];
        filteredTasks = tasks.filter(task => task.dueDate === today);
        break;
      case '/assigned':
        // Add assigned tasks filtering logic here
        break;
      default:
        // Show all tasks
        break;
    }

    return filteredTasks;
  };

  const filteredTasks = filterTasks();
  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {pendingTasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      {completedTasks.length > 0 && (
        <>
          <h3 className="font-medium text-gray-700">Completed</h3>
          <div className="space-y-4">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}