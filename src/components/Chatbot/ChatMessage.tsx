import React from 'react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, timestamp }) => {
  const formattedTime = timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isUser 
          ? 'bg-blue-500 text-white rounded-tr-none' 
          : 'bg-white text-gray-900 shadow-sm rounded-tl-none border border-gray-200'
      }`}>
        <p>{content}</p>
        <div className={`text-xs mt-1 ${
          isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;