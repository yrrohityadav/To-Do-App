import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bell, RotateCcw, Calendar, X, CloudSun } from 'lucide-react';
import { addTask } from '../store/slices/taskSlice';
import { getWeatherData } from '../services/weatherApi';
import type { Task } from '../types';
import { RootState } from '../store';

export default function TaskInput() {
  const [title, setTitle] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isOutdoorTask, setIsOutdoorTask] = useState(false);
  const [city, setCity] = useState('');
  const [showCityInput, setShowCityInput] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: RootState) => state.theme);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let weatherData = null;
    if (isOutdoorTask && city) {
      const weather = await getWeatherData(city);
      weatherData = {
        temp: weather.temp,
        condition: weather.condition
      };
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      priority: 'medium',
      important: false,
      dueDate: selectedDate || undefined,
      weather: weatherData || undefined,
      isOutdoor: isOutdoorTask,
      city: isOutdoorTask ? city : undefined,
    };

    dispatch(addTask(newTask));
    setTitle('');
    setSelectedDate('');
    setShowDatePicker(false);
    setIsOutdoorTask(false);
    setCity('');
    setShowCityInput(false);
    setWeatherError(null);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  const toggleOutdoorTask = () => {
    setIsOutdoorTask(!isOutdoorTask);
    setShowCityInput(!isOutdoorTask);
    setWeatherError(null);
  };

  return (
    <div className={`p-4 rounded-lg mb-6 relative ${isDark ? 'bg-gray-800' : 'bg-green-50'}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add A Task"
            className={`flex-1 border-none focus:ring-0 text-lg placeholder-gray-500 ${
              isDark ? 'bg-gray-800 text-white' : 'bg-transparent'
            }`}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            ADD TASK
          </button>
        </div>

        {showCityInput && (
          <div className="space-y-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city for weather"
              className={`w-full px-3 py-2 rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300'
              } focus:ring-green-500 focus:border-green-500`}
            />
            {!import.meta.env.VITE_OPENWEATHER_API_KEY && (
              <p className={`text-sm ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                Using mock weather data. To enable real weather, add OpenWeather API key to .env file.
              </p>
            )}
            {weatherError && (
              <p className="text-red-500 text-sm">{weatherError}</p>
            )}
          </div>
        )}

        <div className="flex items-center space-x-4 text-gray-500">
          <button type="button" className={`p-2 rounded-full ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-green-100'
          }`}>
            <Bell className="w-5 h-5" />
          </button>
          <button type="button" className={`p-2 rounded-full ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-green-100'
          }`}>
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`p-2 rounded-full ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-green-100'
            }`}
          >
            <Calendar className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={toggleOutdoorTask}
            className={`p-2 rounded-full ${
              isOutdoorTask 
                ? isDark ? 'bg-gray-700' : 'bg-green-200'
                : isDark ? 'hover:bg-gray-700' : 'hover:bg-green-100'
            }`}
          >
            <CloudSun className="w-5 h-5" />
          </button>
        </div>
      </form>

      {showDatePicker && (
        <div className={`absolute left-0 mt-2 w-full rounded-lg shadow-lg p-4 z-10 ${
          isDark ? 'bg-gray-700' : 'bg-white'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-medium ${isDark ? 'text-white' : ''}`}>
              Add Due Date
            </h3>
            <button
              onClick={() => setShowDatePicker(false)}
              className={`p-1 rounded-full ${
                isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateSelect(e.target.value)}
            className={`w-full p-2 rounded-md ${
              isDark 
                ? 'bg-gray-800 border-gray-600 text-white' 
                : 'border-gray-300'
            } focus:ring-green-500 focus:border-green-500`}
          />
        </div>
      )}
    </div>
  );
}