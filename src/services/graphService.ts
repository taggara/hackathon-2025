import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "./msalConfig";
import { mockCalendarEvents } from './mockData';

export class GraphService {
  private static client: Client | null = null;
  private static initialized = false;
  private static initializationPromise: Promise<void> | null = null;

  static async initializeGraphClient(msalInstance: PublicClientApplication) {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = new Promise(async (resolve, reject) => {
      try {
        console.log('Initializing Graph client...');
        const accounts = msalInstance.getAllAccounts();
        
        if (accounts.length === 0) {
          console.log('No accounts found, skipping Graph client initialization');
          this.initialized = false;
          resolve();
          return;
        }

        const account = accounts[0];
        console.log('Using account:', {
          username: account.username,
          environment: account.environment,
          tenantId: account.tenantId
        });

        const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, {
          account,
          scopes: loginRequest.scopes,
          interactionType: 'popup'
        });

        this.client = Client.initWithMiddleware({
          authProvider
        });

        this.initialized = true;
        console.log('Graph client initialized successfully');
        resolve();
      } catch (error) {
        console.error('Failed to initialize Graph client:', error);
        this.initialized = false;
        reject(error);
      }
    });

    return this.initializationPromise;
  }

  private static async ensureInitialized() {
    if (!this.initialized && !this.initializationPromise) {
      throw new Error('Graph client not initialized. Call initializeGraphClient first.');
    }
    if (this.initializationPromise) {
      await this.initializationPromise;
    }
  }

  static async getUserDetails() {
    try {
      await this.ensureInitialized();
      
      if (!this.client) {
        console.log('No authenticated user, returning mock data');
        return {
          displayName: "Alissa Clark",
          mail: "alissa.k.clark@gmail.com",
          jobTitle: "Senior IT Manager",
          department: "O+O OmniSales Commercial",
          id: "OAID00084781"
        };
      }

      console.log('Fetching user details from Graph API...');
      const user = await this.client
        .api('/me')
        .select('displayName,mail,jobTitle,department,id,userPrincipalName')
        .get();
      
      console.log('User details retrieved successfully');
      return user;
    } catch (error) {
      console.error('Error fetching user details:', error);
      if (error instanceof InteractionRequiredAuthError) {
        throw error;
      }
      return {
        displayName: "Alissa Clark",
        mail: "alissa.k.clark@gmail.com",
        jobTitle: "Senior IT Manager",
        department: "O+O OmniSales Commercial",
        id: "OAID00084781"
      };
    }
  }

  static async getCalendarEvents() {
    try {
      await this.ensureInitialized();
      
      if (!this.client) {
        console.log('No authenticated user, returning mock calendar data');
        return mockCalendarEvents;
      }

      const events = await this.client
        .api('/me/calendar/events')
        .select('subject,start,end,attendees')
        .get();

      return events.value;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return mockCalendarEvents;
    }
  }

  static async getTasks() {
    try {
      await this.ensureInitialized();
      
      if (!this.client) {
        return [
          {
            id: "1",
            title: "Review API Integration Technical Specs",
            status: "inProgress",
            importance: "high",
            dueDateTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
            categories: ["Project"]
          },
          {
            id: "2",
            title: "Prepare Q2 Integration Roadmap",
            status: "pending",
            importance: "high",
            dueDateTime: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
            categories: ["Work"]
          }
        ];
      }

      const tasks = await this.client
        .api('/me/todo/lists/tasks/tasks')
        .get();

      return tasks.value;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }

  static async getRecentEmails() {
    try {
      await this.ensureInitialized();
      
      if (!this.client) {
        return [
          {
            id: "1",
            subject: "RE: API Integration Timeline Update",
            receivedDateTime: new Date(new Date().setMinutes(new Date().getMinutes() - 30)).toISOString(),
            from: { emailAddress: { name: "David Kumar", address: "d.kumar@accenture.com" } },
            isRead: false
          },
          {
            id: "2",
            subject: "Master Data Integration - Technical Review",
            receivedDateTime: new Date(new Date().setHours(new Date().getHours() - 2)).toISOString(),
            from: { emailAddress: { name: "Elena Martinez", address: "e.martinez@osf.digital" } },
            isRead: true
          }
        ];
      }

      const emails = await this.client
        .api('/me/messages')
        .select('subject,receivedDateTime,from,isRead')
        .top(10)
        .orderby('receivedDateTime desc')
        .get();

      return emails.value;
    } catch (error) {
      console.error('Error fetching emails:', error);
      return [];
    }
  }
}