import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "./msalConfig";

export class GraphService {
  private static client: Client;

  static async initializeGraphClient(msalInstance: PublicClientApplication) {
    console.log('Initializing Graph client...');
    try {
      const account = msalInstance.getAllAccounts()[0];
      if (!account) {
        throw new Error('No account found');
      }

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
      console.error('Failed to initialize Graph client:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });
      throw error;
    }
  }

  static async getUserDetails() {
    console.log('Fetching user details...');
    try {
      const user = await this.client.api('/me').get();
      console.log('User details retrieved:', {
        displayName: user.displayName,
        email: user.mail,
        id: user.id
      });
      return user;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        console.error('Authentication required:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
        throw error;
      }
      console.error('Error getting user details:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });
      throw error;
    }
  }

  static async getCalendarEvents() {
    console.log('Fetching calendar events...');
    try {
      const events = await this.client
        .api('/me/calendar/events')
        .select('subject,start,end,attendees')
        .orderby('start/dateTime')
        .filter("start/dateTime ge '" + new Date().toISOString() + "'")
        .top(10)
        .get();
      console.log(`Retrieved ${events.value.length} calendar events`);
      return events.value;
    } catch (error) {
      console.error('Error getting calendar events:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });
      throw error;
    }
  }

  static async getTasks() {
    console.log('Fetching tasks...');
    try {
      const lists = await this.client
        .api('/me/todo/lists')
        .get();
      console.log(`Found ${lists.value.length} task lists`);
      
      const defaultList = lists.value[0];
      if (defaultList) {
        console.log('Using default task list:', defaultList.displayName);
        const tasksInList = await this.client
          .api(`/me/todo/lists/${defaultList.id}/tasks`)
          .select('id,title,status,importance,dueDateTime,categories')
          .get();
        console.log(`Retrieved ${tasksInList.value.length} tasks`);
        return tasksInList.value;
      }
      console.log('No task lists found');
      return [];
    } catch (error) {
      console.error('Error getting tasks:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });
      throw error;
    }
  }

  static async getRecentEmails() {
    console.log('Fetching recent emails...');
    try {
      const messages = await this.client
        .api('/me/messages')
        .select('subject,receivedDateTime,from,isRead')
        .orderby('receivedDateTime desc')
        .top(5)
        .get();
      console.log(`Retrieved ${messages.value.length} recent emails`);
      return messages.value;
    } catch (error) {
      console.error('Error getting emails:', {
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack
        } : error
      });
      throw error;
    }
  }
}