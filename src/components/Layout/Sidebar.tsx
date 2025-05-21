import React from 'react';
import { X } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  navItems: NavItem[];
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  toggleSidebar,
  navItems,
  darkMode 
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg md:shadow-none`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center justify-between px-4 md:hidden">
            <span className="font-bold text-lg">AI Assistant</span>
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-full hover:bg-opacity-10 transition-colors
                ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-4">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                      ${index === 0 
                        ? darkMode 
                          ? 'bg-gray-700 text-white' 
                          : 'bg-blue-50 text-blue-600' 
                        : darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <span className="text-sm font-semibold">JD</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">John Doe</span>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  john.doe@example.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;