import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Paperclip, Smile, ChevronDown, ChevronUp } from 'lucide-react';
import ChatMessage from './ChatMessage';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotCard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI assistant powered by Claude-Sonnet 3.5. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "I can help with that! Let me look into it for you.",
        "Based on your tasks and calendar, I recommend prioritizing the quarterly report due today.",
        "Would you like me to help you prepare for your upcoming client meeting?",
        "I've analyzed your schedule and noticed you might be overbooked tomorrow. Would you like me to suggest which meetings could be rescheduled?",
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col transition-all
      ${isCollapsed ? 'h-[200px]' : 'h-[600px] lg:h-[calc(100vh-160px)]'}`}>
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <div>
          <h2 className="font-semibold dark:text-white">AI Assistant</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Powered by Claude-Sonnet 3.5</p>
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>
      
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isCollapsed ? 'hidden' : ''}`}>
        {messages.map(message => (
          <ChatMessage 
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={`p-4 border-t dark:border-gray-700 ${isCollapsed ? 'hidden' : ''}`}>
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Plus size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Paperclip size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
          <div className="flex-1 mx-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="w-full border dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none
                dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              rows={1}
            />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Smile size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={input.trim() === ''}
            className={`p-2 rounded-full transition-colors ${
              input.trim() === '' 
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      
      {isCollapsed && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Chat is minimized. Click the arrow to expand.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatbotCard;