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
  {
    id: "2",
    subject: "Project Status Review",
    start: { dateTime: new Date(weekDates[0].setHours(14, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[0].setHours(15, 0)).toISOString() },
    source: "google",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Sarah Chen", address: "sarah.chen@loreal.com" } }
    ]
  },
  
  // Tuesday
  {
    id: "3",
    subject: "API Integration Planning",
    start: { dateTime: new Date(weekDates[1].setHours(10, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[1].setHours(11, 0)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "John Smith", address: "john.smith@accenture.com" } }
    ]
  },
  {
    id: "4",
    subject: "Client Demo Preparation",
    start: { dateTime: new Date(weekDates[1].setHours(15, 30)).toISOString() },
    end: { dateTime: new Date(weekDates[1].setHours(16, 30)).toISOString() },
    source: "slack",
    isVideoCall: false,
    attendees: [
      { emailAddress: { name: "Marketing Team", address: "marketing@loreal.com" } }
    ]
  },
  
  // Wednesday
  {
    id: "5",
    subject: "Sales Pipeline Review",
    start: { dateTime: new Date(weekDates[2].setHours(11, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[2].setHours(12, 0)).toISOString() },
    source: "google",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Sales Team", address: "sales@loreal.com" } }
    ]
  },
  {
    id: "6",
    subject: "Product Strategy Meeting",
    start: { dateTime: new Date(weekDates[2].setHours(14, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[2].setHours(15, 0)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Product Team", address: "product@loreal.com" } }
    ]
  },
  
  // Thursday
  {
    id: "7",
    subject: "Technical Architecture Review",
    start: { dateTime: new Date(weekDates[3].setHours(9, 30)).toISOString() },
    end: { dateTime: new Date(weekDates[3].setHours(10, 30)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Tech Team", address: "tech@loreal.com" } }
    ]
  },
  {
    id: "8",
    subject: "Sprint Planning",
    start: { dateTime: new Date(weekDates[3].setHours(13, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[3].setHours(14, 0)).toISOString() },
    source: "slack",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Development Team", address: "dev@loreal.com" } }
    ]
  },
  
  // Friday
  {
    id: "9",
    subject: "Stakeholder Update",
    start: { dateTime: new Date(weekDates[4].setHours(10, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[4].setHours(11, 0)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Executive Team", address: "exec@loreal.com" } }
    ]
  },
  {
    id: "10",
    subject: "Team Retrospective",
    start: { dateTime: new Date(weekDates[4].setHours(15, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[4].setHours(16, 0)).toISOString() },
    source: "google",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "All Teams", address: "all@loreal.com" } }
    ]
  },
  
  // Monday (next week)
  {
    id: "11",
    subject: "Q2 Planning",
    start: { dateTime: new Date(weekDates[0].setHours(11, 0)).toISOString() },
    end: { dateTime: new Date(weekDates[0].setHours(12, 0)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Leadership Team", address: "leadership@loreal.com" } }
    ]
  },
  {
    id: "12",
    subject: "Innovation Workshop",
    start: { dateTime: new Date(weekDates[0].setHours(14, 30)).toISOString() },
    end: { dateTime: new Date(weekDates[0].setHours(15, 30)).toISOString() },
    source: "google",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Innovation Team", address: "innovation@loreal.com" } }
    ]
  }
];