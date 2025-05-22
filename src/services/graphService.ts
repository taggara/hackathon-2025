import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "./msalConfig";

export class GraphService {
  private static client: Client;

  static async initializeGraphClient(msalInstance: PublicClientApplication) {
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, {
      account: msalInstance.getAllAccounts()[0],
      scopes: loginRequest.scopes,
      interactionType: 'popup'
    });

    this.client = Client.initWithMiddleware({
      authProvider
    });
  }

  static async getUserDetails() {
    try {
      return await this.client.api('/me').get();
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        throw error;
      }
      console.error('Error getting user details:', error);
      throw error;
    }
  }

  static async getCalendarEvents() {
    try {
      const events = await this.client
        .api('/me/calendar/events')
        .select('subject,start,end,attendees')
        .orderby('start/dateTime')
        .top(10)
        .get();
      return events.value;
    } catch (error) {
      console.error('Error getting calendar events:', error);
      throw error;
    }
  }

  static async getTasks() {
    try {
      const tasks = await this.client
        .api('/me/todo/lists')
        .get();
      const defaultList = tasks.value[0];
      if (defaultList) {
        const tasksInList = await this.client
          .api(`/me/todo/lists/${defaultList.id}/tasks`)
          .get();
        return tasksInList.value;
      }
      return [];
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  }

  static async getRecentEmails() {
    try {
      const messages = await this.client
        .api('/me/messages')
        .select('subject,receivedDateTime,from,isRead')
        .orderby('receivedDateTime desc')
        .top(5)
        .get();
      return messages.value;
    } catch (error) {
      console.error('Error getting emails:', error);
      throw error;
    }
  }
}