import React from 'react';
import { Calendar as CalendarIcon, Users, Video, ExternalLink } from 'lucide-react';
import { GraphService } from '../../services/graphService';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  source: 'microsoft' | 'google' | 'slack';
  attendees?: { name: string; email: string }[];
  location?: string;
  isVideoCall?: boolean;
  link?: string;
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const startOfWeek = React.useMemo(() => {
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay());
    start.setHours(0, 0, 0, 0);
    return start;
  }, [selectedDate]);

  const endOfWeek = React.useMemo(() => {
    const end = new Date(startOfWeek);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return end;
  }, [startOfWeek]);

  const weekDays = React.useMemo(() => {
    const days = [];
    const current = new Date(startOfWeek);
    
    for (let i = 0; i < 7; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [startOfWeek]);

  const timeSlots = React.useMemo(() => {
    const slots = [];
    for (let i = 8; i <= 18; i++) {
      slots.push(i);
    }
    return slots;
  }, []);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const msEvents = await GraphService.getCalendarEvents();
        
        const transformedEvents: CalendarEvent[] = msEvents.map(event => ({
          id: event.id,
          title: event.subject,
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
          source: 'microsoft',
          attendees: event.attendees?.map(a => ({
            name: a.emailAddress.name,
            email: a.emailAddress.address
          })),
          isVideoCall: event.isVideoCall,
        }));

        setEvents(transformedEvents);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedDate]);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'microsoft':
        return <CalendarIcon size={16} className="text-blue-400" />;
      case 'google':
        return <CalendarIcon size={16} className="text-red-400" />;
      case 'slack':
        return <CalendarIcon size={16} className="text-purple-400" />;
      default:
        return <CalendarIcon size={16} className="text-gray-400" />;
    }
  };

  const getEventPosition = (event: CalendarEvent) => {
    const startHour = event.start.getHours() + (event.start.getMinutes() / 60);
    const endHour = event.end.getHours() + (event.end.getMinutes() / 60);
    const duration = endHour - startHour;
    
    const top = `${(startHour - 8) * 60}px`;
    const height = `${duration * 60}px`;
    
    return { top, height };
  };

  if (loading) {
    return (
      <div className="bg-gray-700 dark:bg-gray-800/50 rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-600 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-7 gap-4">
            {Array(7).fill(0).map((_, i) => (
              <div key={i} className="h-96 bg-gray-600 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 dark:bg-gray-800/50 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Calendar</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))}
            className="px-3 py-1 rounded-lg bg-gray-600 dark:bg-gray-700/50 text-gray-300 dark:text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-700 transition-colors"
          >
            Previous Week
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-3 py-1 rounded-lg bg-blue-900/20 dark:bg-blue-900/20 text-blue-400 dark:text-blue-400 hover:bg-blue-900/30 dark:hover:bg-blue-900/30 transition-colors"
          >
            Today
          </button>
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))}
            className="px-3 py-1 rounded-lg bg-gray-600 dark:bg-gray-700/50 text-gray-300 dark:text-gray-300 hover:bg-gray-500 dark:hover:bg-gray-700 transition-colors"
          >
            Next Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4">
        <div className="pt-8">
          {timeSlots.map(hour => (
            <div key={hour} className="h-[60px] text-right pr-2">
              <span className="text-sm text-gray-300 dark:text-gray-400">
                {hour}:00
              </span>
            </div>
          ))}
        </div>

        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="relative">
            <div className="text-center pb-4">
              <div className="text-sm font-medium text-gray-300 dark:text-gray-300">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-2xl font-semibold ${
                day.toDateString() === new Date().toDateString()
                  ? 'text-blue-400'
                  : 'text-white'
              }`}>
                {day.getDate()}
              </div>
            </div>

            <div className="relative h-[660px] border-l border-gray-600 dark:border-gray-700">
              {timeSlots.map(hour => (
                <div 
                  key={hour} 
                  className="absolute w-full h-[60px]" 
                  style={{ top: `${(hour - 8) * 60}px` }}
                >
                  <div className="border-t border-gray-600 dark:border-gray-700 w-full h-full"></div>
                </div>
              ))}

              {events
                .filter(event => {
                  const eventDate = new Date(event.start);
                  return eventDate.toDateString() === day.toDateString();
                })
                .map(event => {
                  const { top, height } = getEventPosition(event);
                  return (
                    <div
                      key={event.id}
                      className="absolute w-[95%] p-2 rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md"
                      style={{
                        top,
                        height,
                        backgroundColor: event.source === 'microsoft' 
                          ? 'rgba(59, 130, 246, 0.1)' 
                          : event.source === 'google'
                          ? 'rgba(239, 68, 68, 0.1)'
                          : 'rgba(168, 85, 247, 0.1)',
                        borderLeft: `3px solid ${
                          event.source === 'microsoft' 
                            ? 'rgb(96, 165, 250)' 
                            : event.source === 'google'
                            ? 'rgb(248, 113, 113)'
                            : 'rgb(192, 132, 252)'
                        }`
                      }}
                    >
                      <div className="flex items-start space-x-1">
                        {getSourceIcon(event.source)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-white">
                            {event.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            {event.isVideoCall && (
                              <Video size={14} className="text-gray-300 dark:text-gray-400" />
                            )}
                            {event.attendees && event.attendees.length > 0 && (
                              <div className="flex items-center text-xs text-gray-300 dark:text-gray-400">
                                <Users size={14} className="mr-1" />
                                <span>{event.attendees.length}</span>
                              </div>
                            )}
                            {event.link && (
                              <ExternalLink size={14} className="text-gray-300 dark:text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;