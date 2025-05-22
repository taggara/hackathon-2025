import React, { useState, useEffect } from 'react';
import { Video, Users, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { GraphService } from '../../services/graphService';

const UpcomingMeetings: React.FC = () => {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const events = await GraphService.getCalendarEvents();
        setMeetings(events);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 transition-all">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6 transition-all">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Today's Meetings</h2>
        <div className="flex items-center space-x-2">
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors">
            View Calendar
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
        {meetings.map(meeting => (
          <div 
            key={meeting.id}
            className="p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-white">{meeting.subject}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {new Date(meeting.start.dateTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })} - {new Date(meeting.end.dateTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users size={14} className="mr-1" />
                  <span>{meeting.attendees?.length || 0}</span>
                </div>
                <button className="p-1 bg-blue-100 dark:bg-blue-900/50 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                  <Video size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {meetings.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            No meetings scheduled for today
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

export default UpcomingMeetings;