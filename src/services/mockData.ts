import { CalendarEvent } from '../types/calendar';

// Helper function to create dates for the current week
const getWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
  const dates = [];
  
  // Get Monday of current week
  const monday = new Date(today);
  monday.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
  
  // Generate dates for the week
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};

const weekDates = getWeekDates();

export const mockCalendarEvents: CalendarEvent[] = [
  // Monday
  {
    id: "1",
    subject: "Weekly Team Sync",
    start: { dateTime: new Date(weekDates[0].setHours(9, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[0].setHours(10, 0)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Team OmniSales", address: "team.omnisales@loreal.com" } }
    ]
  },
  
  // Tuesday
  {
    id: "2",
    subject: "API Integration Planning",
    start: { dateTime: new Date(weekDates[1].setHours(10, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[1].setHours(11, 0)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "John Smith", address: "john.smith@accenture.com" } }
    ]
  },
  
  // Wednesday
  {
    id: "3",
    subject: "Sales Pipeline Review",
    start: { dateTime: new Date(weekDates[2].setHours(11, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[2].setHours(12, 0)).toISOString() },
    source: "google",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Sales Team", address: "sales@loreal.com" } }
    ]
  },
  
  // Thursday
  {
    id: "4",
    subject: "Technical Architecture Review",
    start: { dateTime: new Date(weekDates[3].setHours(9, 30)).toISOString() },
    end: { dateTime: new Date(weekDates[3].setHours(10, 30)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Tech Team", address: "tech@loreal.com" } }
    ]
  },
  
  // Friday
  {
    id: "5",
    subject: "Stakeholder Update",
    start: { dateTime: new Date(weekDates[4].setHours(10, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[4].setHours(11, 0)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Executive Team", address: "exec@loreal.com" } }
    ]
  }
];