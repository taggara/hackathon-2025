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
        <RecentMessages />
      </div>
      <div className="lg:col-span-1">
        <ChatbotCard />
      </div>
    </div>
  );
};

export default DashboardPage;