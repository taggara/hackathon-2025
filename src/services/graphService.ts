import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "./msalConfig";

export class GraphService {
  private static client: Client;

  static async initializeGraphClient(msalInstance: PublicClientApplication) {
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, {
      account: msalInstance.getAllAccounts()[0],
      scopes: [...loginRequest.scopes, "user_impersonation"],
      interactionType: 'popup'
    });

    this.client = Client.initWithMiddleware({
      authProvider
    });
  }

  static async getUserDetails() {
    try {
      const user = await this.client.api('/me').get();
      const groups = await this.client.api('/me/memberOf').get();
      return { ...user, groups: groups.value };
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        throw error;
      }
      console.error('Error getting user details:', error);
      throw error;
    }
  }
}