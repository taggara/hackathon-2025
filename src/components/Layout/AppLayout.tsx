import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Settings, Home, Calendar, MessageSquare, List, User } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigate: (path: string) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
    { icon: <List size={20} />, label: 'Tasks', path: '/tasks' },
    { icon: <Calendar size={20} />, label: 'Calendar', path: '/calendar' },
    { icon: <MessageSquare size={20} />, label: 'Chat', path: '/chat' },
    { icon: <User size={20} />, label: 'Profile', path: '/profile' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleDarkMode={toggleDarkMode} 
        darkMode={darkMode} 
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          navItems={navItems} 
          darkMode={darkMode}
          onNavigate={onNavigate}
        />
        <main className={`flex-1 overflow-y-auto transition-all duration-300 p-6 
          ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;