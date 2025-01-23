import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ListTodo, Calendar, Star, Users } from 'lucide-react';
import { RootState } from '../store';

export default function Sidebar() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
          alt={user?.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="font-semibold">Hey, {user?.name}</h2>
        </div>
      </div>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg ${
              isActive ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <ListTodo className="w-5 h-5" />
          <span>All Tasks</span>
        </NavLink>

        <NavLink
          to="/today"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg ${
              isActive ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <Calendar className="w-5 h-5" />
          <span>Today</span>
        </NavLink>

        <NavLink
          to="/important"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg ${
              isActive ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <Star className="w-5 h-5" />
          <span>Important</span>
        </NavLink>

        <NavLink
          to="/assigned"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-lg ${
              isActive ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
            }`
          }
        >
          <Users className="w-5 h-5" />
          <span>Assigned to me</span>
        </NavLink>
      </nav>
    </aside>
  );
}