import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Grid2X2, Moon, Sun, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import { toggleTheme } from '../store/slices/themeSlice';
import { RootState } from '../store';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isDark } = useSelector((state: RootState) => state.theme);
  const [searchQuery, setSearchQuery] = useState('');
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-green-600 text-xl font-bold">DoIt</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-64 px-4 py-2 rounded-lg ${
                    isDark
                      ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-green-500'
                      : 'bg-gray-100 focus:ring-green-500'
                  } focus:outline-none focus:ring-2`}
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                
                {searchQuery && (
                  <div className={`absolute mt-2 w-full rounded-md shadow-lg ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } z-10`}>
                    {filteredTasks.map(task => (
                      <div
                        key={task.id}
                        className={`px-4 py-2 text-sm ${
                          isDark
                            ? 'hover:bg-gray-700'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className={`p-2 rounded-lg ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <Grid2X2 className={`h-5 w-5 ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`} />
              </button>

              <button
                onClick={handleThemeToggle}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-500" />
                )}
              </button>

              <button
                onClick={handleLogout}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                title="Logout"
              >
                <LogOut className={`h-5 w-5 ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}