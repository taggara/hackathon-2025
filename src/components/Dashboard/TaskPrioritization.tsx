import React, { useState, useEffect } from 'react';
import { Clock, BarChart2, CheckCircle, AlertCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { GraphService } from '../../services/graphService';

const TaskPrioritization: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await GraphService.getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getPriorityColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200';
      case 'normal':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Work':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200';
      case 'Meeting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
      case 'Project':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 transition-all">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">Prioritized Tasks</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            AI-suggested priority based on due dates and importance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors">
            View All
          </button>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
      </div>
      
      <div className={`space-y-4 transition-all ${isCollapsed ? 'hidden' : ''}`}>
        {tasks.map(task => (
          <div 
            key={task.id}
            className="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {task.status === 'inProgress' ? (
                    <Clock size={18} className="text-blue-500" />
                  ) : task.status === 'completed' ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <AlertCircle size={18} className="text-amber-500" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{task.title}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>{task.dueDateTime ? new Date(task.dueDateTime).toLocaleDateString() : 'No due date'}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.categories?.[0] || 'Other')}`}>
                  {task.categories?.[0] || 'Other'}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.importance)}`}>
                  {task.importance.charAt(0).toUpperCase() + task.importance.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No tasks found
          </div>
        )}
      </div>
      
      {isCollapsed && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
          Content collapsed. Click the arrow to expand.
        </div>
      )}
    </div>
  );
};

export default TaskPrioritization;