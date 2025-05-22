import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "./msalConfig";
import { mockCalendarEvents } from './mockData';

export class GraphService {
  private static client: Client;

  static async initializeGraphClient(msalInstance: PublicClientApplication) {
    console.log('Initializing Graph client...');
    try {
      const account = msalInstance.getAllAccounts()[0];
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

      console.log('Graph client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Graph client:', error);
      throw error;
    }
  }

  static async getUserDetails() {
    console.log('Fetching user details from Graph API...');
    try {
      const user = await this.client
        .api('/me')
        .select('displayName,mail,jobTitle,companyName,id,userPrincipalName')
        .get();
      
      console.log('User details retrieved successfully');
      return user;
    } catch (error) {
      console.error('Error fetching user details:', error);
      if (error instanceof InteractionRequiredAuthError) {
        throw error;
      }
      // Fallback to mock data if there's an error
      console.warn('Falling back to mock user data');
      return {
        displayName: "Alissa Clark",
        mail: "alissa.k.clark@gmail.com",
        jobTitle: "Senior IT Manager",
        companyName: "O+O OmniSales Commercial",
        id: "OAID00084781"
      };
    }
  }

  static async getCalendarEvents() {
    return mockCalendarEvents;
  }

  static async getTasks() {
    // Return mock tasks relevant to the project
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
        categories: ["Support"]
      },
      {
        id: "3",
        title: "OSF Integration Testing Feedback",
        status: "completed",
        importance: "normal",
        dueDateTime: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
        categories: ["Project"]
      },
      {
        id: "4",
        title: "Master Data Schema Validation",
        status: "inProgress",
        importance: "high",
        dueDateTime: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
        categories: ["Project"]
      },
      {
        id: "5",
        title: "Vendor Sync-up Documentation",
        status: "pending",
        importance: "normal",
        dueDateTime: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(),
        categories: ["Support"]
      }
    ];
  }

  static async getRecentEmails() {
    // Return mock emails relevant to the project
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
      },
      {
        id: "3",
        subject: "Updated: Sales Order Creation Workflow",
        receivedDateTime: new Date(new Date().setHours(new Date().getHours() - 3)).toISOString(),
        from: { emailAddress: { name: "Priya Sharma", address: "p.sharma@wipro.com" } },
        isRead: false
      },
      {
        id: "4",
        subject: "Sprint Demo Preparation",
        receivedDateTime: new Date(new Date().setHours(new Date().getHours() - 4)).toISOString(),
        from: { emailAddress: { name: "Michael Chang", address: "m.chang@salesforce.com" } },
        isRead: true
      }
    ];
  }
}