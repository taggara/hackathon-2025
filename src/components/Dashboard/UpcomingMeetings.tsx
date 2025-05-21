import React from 'react';
import { Video, Users, Clock } from 'lucide-react';

const meetings = [
  {
    id: 1,
    title: 'Weekly Team Standup',
    time: '10:00 AM - 10:30 AM',
    type: 'Teams',
    participants: 8,
  },
  {
    id: 2,
    title: 'Product Review',
    time: '2:00 PM - 3:00 PM',
    type: 'Teams',
    participants: 5,
  },
  {
    id: 3,
    title: 'Client Update',
    time: '4:30 PM - 5:00 PM',
    type: 'Teams',
    participants: 3,
  },
];

const UpcomingMeetings: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Today's Meetings</h2>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors">
          View Calendar
        </button>
      </div>
      
      <div className="space-y-4">
        {meetings.map(meeting => (
          <div 
            key={meeting.id}
            className="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white">{meeting.title}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={14} className="mr-1" />
                  <span>{meeting.time}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users size={14} className="mr-1" />
                  <span>{meeting.participants}</span>
                </div>
                <button className="p-1 bg-blue-100 dark:bg-blue-900 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                  <Video size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeetings;