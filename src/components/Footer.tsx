import React from 'react';
import { useSelector } from 'react-redux';
import { Github, Twitter, Mail } from 'lucide-react';
import { RootState } from '../store';

export default function Footer() {
  const { isDark } = useSelector((state: RootState) => state.theme);

  return (
    <footer className={`${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } border-t mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-green-600 font-bold">DoIt</span>
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              © {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#"
              className={`${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              } transition-colors`}
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className={`${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              } transition-colors`}
              title="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className={`${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              } transition-colors`}
              title="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className={`${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}>
              Privacy
            </a>
            <a href="#" className={`${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}>
              Terms
            </a>
            <a href="#" className={`${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}