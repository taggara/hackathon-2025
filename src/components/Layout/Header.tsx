import React from 'react';
import { Menu, Sun, Moon, Bell, Search } from 'lucide-react';
import { useMsal } from "@azure/msal-react";
import LoginButton from '../Auth/LoginButton';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleDarkMode, darkMode }) => {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const userInitial = isAuthenticated ? accounts[0]?.username?.charAt(0).toUpperCase() : '';

  return (
    <header className={`py-4 px-6 flex items-center justify-between shadow-sm z-10 transition-colors
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-700 text-white'}`}>
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className={`p-2 mr-4 rounded-full hover:bg-opacity-10 transition-colors
            ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-600'}`}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-3">
          <img 
            src="https://i.imgur.com/9eYIz0m.png" 
            alt="AI Alchemist"
            className="h-8 w-8"
          />
          <span className="font-bold text-lg md:text-xl">AI Alchemist</span>
        </div>
      </div>

      <div className="hidden md:flex items-center relative flex-1 max-w-md mx-8">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className={`block w-full pl-10 pr-3 py-2 rounded-lg border transition-colors
            ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
              : 'bg-gray-600 border-gray-500 text-white placeholder-gray-400 focus:border-blue-500'
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full hover:bg-opacity-10 transition-colors
            ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-600'}`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-full hover:bg-opacity-10 transition-colors relative
                ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-600'}`}
              aria-label="Notifications"
            >
              <Bell size={20} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
              <span className="text-sm font-semibold">{userInitial}</span>
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;