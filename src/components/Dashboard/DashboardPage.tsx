import React from 'react';
import TaskPrioritization from './TaskPrioritization';
import TasksOverview from './TasksOverview';
import UpcomingMeetings from './UpcomingMeetings';
import RecentMessages from './RecentMessages';
import ChatbotCard from '../Chatbot/ChatbotCard';

const DashboardPage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <TaskPrioritization />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TasksOverview />
          <UpcomingMeetings />
        </div>
      </div>
      <div className="lg:col-span-1 space-y-6">
        <div className="h-[500px]">
          <ChatbotCard />
        </div>
        <div className="h-[200px] overflow-hidden">
          <RecentMessages />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;