import React, { useState, useEffect } from 'react';
import { MessageSquare, ChevronUp, ChevronDown, AppWindow as Windows, Mail as Google, Slack } from 'lucide-react';
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

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'microsoft':
        return <Windows size={16} className="text-blue-400" />;
      case 'google':
        return <Google size={16} className="text-red-400" />;
      case 'slack':
        return <Slack size={16} className="text-purple-400" />;
      default:
        return <Windows size={16} className="text-blue-400" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-700 dark:bg-gray-800/50 rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-600 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-600 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 dark:bg-gray-800/50 rounded-xl shadow-sm flex flex-col">
      <div className="p-4 border-b border-gray-600 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Recent Messages</h2>
          <div className="flex items-center space-x-2">
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              View All
            </button>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-full hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors text-white"
            >
              {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'hidden' : ''}`}>
        <div className="p-4 space-y-4">
          {messages.map(message => (
            <div 
              key={message.id}
              className="p-4 border border-gray-600 dark:border-gray-700 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getSourceIcon(message.source || 'microsoft')}
                  <div>
                    <h3 className="font-medium text-white line-clamp-1">{message.subject}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-300 dark:text-gray-400">
                      <span className="line-clamp-1">{message.from.emailAddress.name}</span>
                      <span className="mx-2">•</span>
                      <span>
                        {new Date(message.receivedDateTime).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {!message.isRead && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                  <button className="p-1 hover:bg-gray-600 dark:hover:bg-gray-700 rounded-md text-gray-300 dark:text-gray-400 transition-colors">
                    <MessageSquare size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {messages.length === 0 && (
            <div className="text-center text-gray-300 dark:text-gray-400 py-4">
              No recent messages
            </div>
          )}
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

export default RecentMessages;