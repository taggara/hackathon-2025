import React from 'react';
import { MessageSquare } from 'lucide-react';

const messages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    avatar: 'SJ',
    message: 'Can you review the latest design mockups for the client presentation?',
    time: '30 minutes ago',
    unread: true,
  },
  {
    id: 2,
    sender: 'Michael Chen',
    avatar: 'MC',
    message: 'The project timeline has been updated. Let me know your thoughts.',
    time: '1 hour ago',
    unread: false,
  },
  {
    id: 3,
    sender: 'Team Announcements',
    avatar: 'TA',
    message: 'Company all-hands meeting this Friday at 4 PM. Please attend.',
    time: '2 hours ago',
    unread: false,
  },
];

const RecentMessages: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold dark:text-white">Recent Messages</h2>
          <div className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            1
          </div>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors">
          Open Teams
        </button>
      </div>
      
      <div className="space-y-4">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`p-4 rounded-lg transition-colors ${
              msg.unread 
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800' 
                : 'border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium ${
                msg.unread ? 'bg-blue-500' : 'bg-gray-500 dark:bg-gray-600'
              }`}>
                {msg.avatar}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium dark:text-white">{msg.sender}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{msg.message}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center transition-colors">
                <MessageSquare size={14} className="mr-1" />
                Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;