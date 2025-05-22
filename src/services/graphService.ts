import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { PublicClientApplication, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "./msalConfig";
import { AuthLogger } from "./authLogger";

export class GraphService {
  private static client: Client;

  static async initializeGraphClient(msalInstance: PublicClientApplication) {
    try {
      AuthLogger.log(2, "Initializing Graph client");
      
      const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(msalInstance, {
        account: msalInstance.getAllAccounts()[0],
        scopes: [...loginRequest.scopes, "user_impersonation"],
        interactionType: 'popup'
      });

      this.client = Client.initWithMiddleware({
        authProvider
      });

      AuthLogger.log(2, "Graph client initialized successfully");
    } catch (error) {
      AuthLogger.log(0, `Graph client initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      throw error;
    }
  }

  static async getUserDetails() {
    try {
      AuthLogger.log(2, "Fetching user details from Graph API");
      
      const user = await this.client.api('/me').get();
      const groups = await this.client.api('/me/memberOf').get();
      
      AuthLogger.log(2, "User details fetched successfully");
      AuthLogger.log(3, `User principal name: ${user.userPrincipalName}`);
      AuthLogger.log(3, `Groups count: ${groups.value.length}`);
      
      return { ...user, groups: groups.value };
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        AuthLogger.log(1, "Authentication token expired or invalid, requiring new interaction");
        throw error;
      }
      AuthLogger.log(0, `Error getting user details: ${error instanceof Error ? error.message : "Unknown error"}`);
      throw error;
    }
  }
}