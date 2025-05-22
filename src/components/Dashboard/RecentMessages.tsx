import React, { useState, useEffect } from 'react';
import { MessageSquare, ChevronUp, ChevronDown } from 'lucide-react';
import { GraphService } from '../../services/graphService';

const RecentMessages: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const emails = await GraphService.getRecentEmails();
        setMessages(emails);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 transition-all">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(msg => msg.isRead === false).length;

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold dark:text-white">Recent Messages</h2>
          {unreadCount > 0 && (
            <div className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors">
            Open Outlook
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
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`p-4 rounded-lg transition-colors ${
              !msg.isRead 
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800' 
                : 'border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="flex">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium ${
                !msg.isRead ? 'bg-blue-500' : 'bg-gray-500 dark:bg-gray-600'
              }`}>
                {msg.from.emailAddress.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium dark:text-white">{msg.from.emailAddress.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(msg.receivedDateTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{msg.subject}</p>
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
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No recent messages
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

export default RecentMessages;