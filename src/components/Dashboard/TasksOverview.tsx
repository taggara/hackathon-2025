import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertTriangle, XCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { GraphService } from '../../services/graphService';

const TasksOverview: React.FC = () => {
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    inProgress: 0,
    pending: 0,
    overdue: 0,
    totalTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const tasks = await GraphService.getTasks();
        const now = new Date();
        
        const stats = tasks.reduce((acc: any, task: any) => {
          acc.totalTasks++;
          
          if (task.status === 'completed') {
            acc.completed++;
          } else if (task.status === 'inProgress') {
            acc.inProgress++;
          } else if (task.dueDateTime && new Date(task.dueDateTime) < now) {
            acc.overdue++;
          } else {
            acc.pending++;
          }
          
          return acc;
        }, {
          completed: 0,
          inProgress: 0,
          pending: 0,
          overdue: 0,
          totalTasks: 0
        });

        setTaskStats(stats);
      } catch (error) {
        console.error('Error fetching task stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskStats();
  }, []);

  const taskStatItems = [
    { label: 'Completed', count: taskStats.completed, icon: <CheckCircle size={18} className="text-green-400" /> },
    { label: 'In Progress', count: taskStats.inProgress, icon: <Clock size={18} className="text-blue-400" /> },
    { label: 'Pending', count: taskStats.pending, icon: <AlertTriangle size={18} className="text-amber-400" /> },
    { label: 'Overdue', count: taskStats.overdue, icon: <XCircle size={18} className="text-red-400" /> },
  ];

  if (loading) {
    return (
      <div className="bg-gray-700 dark:bg-gray-800/50 rounded-xl shadow-sm p-6 transition-all">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-600 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-600 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="h-2.5 bg-gray-600 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const completionPercentage = taskStats.totalTasks > 0
    ? Math.round((taskStats.completed / taskStats.totalTasks) * 100)
    : 0;

  return (
    <div className="bg-gray-700 dark:bg-gray-800/50 rounded-xl shadow-sm p-6 transition-all">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Tasks Overview</h2>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? <ChevronDown size={20} className="text-white" /> : <ChevronUp size={20} className="text-white" />}
        </button>
      </div>
      
      <div className={`transition-all ${isCollapsed ? 'hidden' : ''}`}>
        <div className="grid grid-cols-2 gap-4">
          {taskStatItems.map((stat, index) => (
            <div 
              key={index} 
              className="border border-gray-600 dark:border-gray-700 rounded-lg p-4 transition-all hover:shadow-md"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gray-600 dark:bg-gray-700/50">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-300 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1 text-white">{stat.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <div className="w-full bg-gray-600 dark:bg-gray-700 rounded-full h-2.5 mb-1">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300 dark:text-gray-400">
            {completionPercentage}% of tasks completed
          </p>
        </div>
      </div>
      
      {isCollapsed && (
        <div className="text-center text-gray-300 dark:text-gray-400 py-4">
          Content collapsed. Click the arrow to expand.
        </div>
      )}
    </div>
  );
};

export default TasksOverview;