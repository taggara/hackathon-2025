export interface CalendarEvent {
  id: string;
  subject: string;
  start: { dateTime: string };
  end: { dateTime: string };
  source: 'microsoft' | 'google' | 'slack';
  isVideoCall: boolean;
  attendees?: {
    emailAddress: {
      name: string;
      address: string;
    };
  }[];
}