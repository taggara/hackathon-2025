import React from 'react';
import { CheckCircle, Clock, AlertTriangle, XCircle } from 'lucide-react';

const taskStats = [
  { label: 'Completed', count: 12, icon: <CheckCircle size={18} className="text-green-500" /> },
  { label: 'In Progress', count: 5, icon: <Clock size={18} className="text-blue-500" /> },
  { label: 'Pending', count: 8, icon: <AlertTriangle size={18} className="text-amber-500" /> },
  { label: 'Overdue', count: 2, icon: <XCircle size={18} className="text-red-500" /> },
];

const TasksOverview: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Tasks Overview</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {taskStats.map((stat, index) => (
          <div 
            key={index} 
            className="border dark:border-gray-700 rounded-lg p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1 dark:text-white">{stat.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          70% of weekly tasks completed
        </p>
      </div>
    </div>
  );
};

export default TasksOverview;