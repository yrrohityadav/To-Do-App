import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Calendar, CloudSun } from 'lucide-react';
import { toggleTask, removeTask, toggleImportant, updateTaskDueDate, setWeatherData } from '../store/slices/taskSlice';
import { getWeatherData } from '../services/weatherApi';
import type { Task } from '../types';
import { RootState } from '../store';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const updateWeather = async () => {
      if (task.isOutdoor && task.city) {
        const weatherData = await getWeatherData(task.city);
        if (weatherData) {
          dispatch(setWeatherData({ id: task.id, weather: weatherData }));
        }
      }
    };

    // Update weather every 30 minutes
    updateWeather();
    const interval = setInterval(updateWeather, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [task.id, task.isOutdoor, task.city, dispatch]);

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const handleRemove = () => {
    dispatch(removeTask(task.id));
  };

  const handleImportantToggle = () => {
    dispatch(toggleImportant(task.id));
  };

  return (
    <div className={`flex items-center space-x-4 p-4 rounded-lg shadow-sm ${
      isDark ? 'bg-gray-800' : 'bg-white'
    } ${task.completed ? 'opacity-50' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
      />
      <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : isDark ? 'text-white' : ''}`}>
        {task.title}
      </span>
      
      <div className="flex items-center space-x-3">
        {task.dueDate && (
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        
        {task.isOutdoor && (
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
            isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <CloudSun className="w-4 h-4 text-gray-500" />
            {task.weather && (
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {task.weather.temp}°C - {task.weather.condition}
              </span>
            )}
          </div>
        )}

        <button
          onClick={handleImportantToggle}
          className={`p-1 rounded-full ${
            task.important ? 'text-yellow-500' : isDark ? 'text-gray-600 hover:text-gray-500' : 'text-gray-300 hover:text-gray-400'
          }`}
        >
          <Star className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}