import React from 'react';
import { Clock, BarChart2, CheckCircle, AlertCircle } from 'lucide-react';

const priorityTasks = [
  {
    id: 1,
    title: 'Quarterly Report Review',
    dueDate: 'Today, 5:00 PM',
    priority: 'High',
    category: 'Work',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'Team Sync Meeting',
    dueDate: 'Tomorrow, 10:00 AM',
    priority: 'Medium',
    category: 'Meeting',
    status: 'Scheduled',
  },
  {
    id: 3,
    title: 'Update Project Timeline',
    dueDate: 'Today, 3:00 PM',
    priority: 'High',
    category: 'Project',
    status: 'Not Started',
  },
  {
    id: 4,
    title: 'Client Presentation',
    dueDate: 'Friday, 2:00 PM',
    priority: 'Medium',
    category: 'Meeting',
    status: 'Not Started',
  },
];

const TaskPrioritization: React.FC = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Meeting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Project':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Prioritized Tasks</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            AI-suggested priority based on due dates and importance
          </p>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {priorityTasks.map(task => (
          <div 
            key={task.id}
            className="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {task.status === 'In Progress' ? (
                    <Clock size={18} className="text-blue-500" />
                  ) : task.status === 'Scheduled' ? (
                    <BarChart2 size={18} className="text-purple-500" />
                  ) : task.status === 'Completed' ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <AlertCircle size={18} className="text-amber-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{task.title}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                  {task.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPrioritization;