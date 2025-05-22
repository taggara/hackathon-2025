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

  // Get the start and end of the selected week
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

  // Generate week days
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

  // Fetch events from different sources
  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Microsoft Calendar events
        const msEvents = await GraphService.getCalendarEvents();
        
        // Transform events to common format
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
          isVideoCall: event.subject.toLowerCase().includes('teams') || 
                      event.subject.toLowerCase().includes('zoom'),
        }));

        // Mock Google Calendar events
        const googleEvents: CalendarEvent[] = [
          {
            id: 'g1',
            title: 'Internal OneSFA - NEO Mapping + Open Points Alignment',
            start: new Date(new Date().setHours(10, 0)),
            end: new Date(new Date().setHours(11, 0)),
            source: 'google',
            attendees: [
              { name: 'Rodrigues, Vania Leticia', email: 'vania.l.rodrigues@accenture.com' },
              { name: 'Denadai, Luis Gustavo Boteon', email: 'luis.denadai@accenture.com' }
            ],
            isVideoCall: true,
          }
        ];

        // Mock Slack events
        const slackEvents: CalendarEvent[] = [
          {
            id: 's1',
            title: 'Alissa / David: Touchbase',
            start: new Date(new Date().setHours(13, 0)),
            end: new Date(new Date().setHours(14, 30)),
            source: 'slack',
            attendees: [
              { name: 'DABOUE David', email: 'David.Daboue@loreal.com' },
            ],
            isVideoCall: true,
            link: 'https://slack.com/call/123'
          }
        ];

        setEvents([...transformedEvents, ...googleEvents, ...slackEvents]);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'microsoft':
        return <CalendarIcon size={16} className="text-blue-500" />;
      case 'google':
        return <CalendarIcon size={16} className="text-red-500" />;
      case 'slack':
        return <CalendarIcon size={16} className="text-purple-500" />;
      default:
        return <CalendarIcon size={16} className="text-gray-500" />;
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
      <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-7 gap-4">
            {Array(7).fill(0).map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Calendar</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)))}
            className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Previous Week
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
          >
            Today
          </button>
          <button 
            onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)))}
            className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Next Week
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4">
        {/* Time slots */}
        <div className="pt-8">
          {timeSlots.map(hour => (
            <div key={hour} className="h-[60px] text-right pr-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {hour}:00
              </span>
            </div>
          ))}
        </div>

        {/* Days */}
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="relative">
            <div className="text-center pb-4">
              <div className="text-sm font-medium dark:text-gray-300">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-2xl font-semibold ${
                day.toDateString() === new Date().toDateString()
                  ? 'text-blue-500'
                  : 'dark:text-white'
              }`}>
                {day.getDate()}
              </div>
            </div>

            {/* Time grid */}
            <div className="relative h-[660px] border-l dark:border-gray-700">
              {timeSlots.map(hour => (
                <div 
                  key={hour} 
                  className="absolute w-full h-[60px]" 
                  style={{ top: `${(hour - 8) * 60}px` }}
                >
                  <div className="border-t dark:border-gray-700 w-full h-full"></div>
                </div>
              ))}

              {/* Events */}
              {events
                .filter(event => event.start.toDateString() === day.toDateString())
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
                            ? 'rgb(59, 130, 246)' 
                            : event.source === 'google'
                            ? 'rgb(239, 68, 68)'
                            : 'rgb(168, 85, 247)'
                        }`
                      }}
                    >
                      <div className="flex items-start space-x-1">
                        {getSourceIcon(event.source)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate dark:text-white">
                            {event.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            {event.isVideoCall && (
                              <Video size={14} className="text-gray-500 dark:text-gray-400" />
                            )}
                            {event.attendees && event.attendees.length > 0 && (
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <Users size={14} className="mr-1" />
                                <span>{event.attendees.length}</span>
                              </div>
                            )}
                            {event.link && (
                              <ExternalLink size={14} className="text-gray-500 dark:text-gray-400" />
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