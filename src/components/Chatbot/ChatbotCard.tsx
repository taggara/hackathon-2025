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
      content: "Hello! I'm your AI assistant powered by OpenAI. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;
    
    console.log('Initiating message send:', { message: input });
    
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    console.log('Adding user message to chat:', userMessage);
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      console.log('Sending API request to endpoint...');
      const response = await fetch('https://dabs2bck.app.n8n.cloud/webhook/69aff619-cd62-487a-ab61-6829ac81b01c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      console.log('Received API response:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Parsed API response data:', data.output);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: data.output || data.message || 'I apologize, but I encountered an issue processing your request.',
        isUser: false,
        timestamp: new Date(),
      };
      
      console.log('Adding AI response to chat:', aiMessage);
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error in API request:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "I apologize, but I'm having trouble connecting to my backend service. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      console.log('Adding error message to chat:', errorMessage);
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      console.log('Request cycle completed');
      setIsLoading(false);
    }
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
    <div className={`bg-white dark:bg-gray-800/50 rounded-xl shadow-sm flex flex-col h-full transition-all`}>
      <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
        <div>
          <h2 className="font-semibold dark:text-white">AI Assistant</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Powered by GPT-4</p>
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
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2 text-gray-500 dark:text-gray-400">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
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
              disabled={isLoading}
            />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Smile size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={handleSendMessage}
            disabled={input.trim() === '' || isLoading}
            className={`p-2 rounded-full transition-colors ${
              input.trim() === '' || isLoading
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