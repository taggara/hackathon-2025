import { CalendarEvent } from '../types/calendar';

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    subject: "API Integration Planning with Accenture",
    start: { dateTime: new Date(new Date().setHours(10, 0)).toISOString() },
    end: { dateTime: new Date(new Date().setHours(11, 0)).toISOString() },
    source: "microsoft",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "John Smith", address: "john.smith@accenture.com" } },
      { emailAddress: { name: "Maria Garcia", address: "m.garcia@salesforce.com" } }
    ]
  },
  {
    id: "2",
    subject: "SalesCloud Master Data Review",
    start: { dateTime: new Date(new Date().setHours(13, 0)).toISOString() },
    end: { dateTime: new Date(new Date().setHours(14, 30)).toISOString() },
    source: "google",
    isVideoCall: true,
    attendees: [
      { emailAddress: { name: "Raj Patel", address: "raj.patel@wipro.com" } },
      { emailAddress: { name: "Alex Wong", address: "alex.w@salesforce.com" } }
    ]
  },
  {
    id: "3",
    subject: "Sprint Planning: Order Creation Optimization",
    start: { dateTime: new Date(new Date().setHours(15, 0)).toISOString() },
    end: { dateTime: new Date(new Date().setHours(16, 0)).toISOString() },
    source: "slack",
    isVideoCall: false,
    attendees: [
      { emailAddress: { name: "Team SalesCloud", address: "salescloud@salesforce.com" } }
    ]
  }
];