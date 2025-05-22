import { Configuration, PopupRequest, LogLevel } from "@azure/msal-browser";
import { AuthLogger } from "./authLogger";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID ?? "",
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: `${window.location.origin}/auth`,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  system: {
    allowNativeBroker: false,
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
    loggerOptions: {
      logLevel: LogLevel.Verbose,
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        AuthLogger.log(level, message, containsPii);
      },
      piiLoggingEnabled: false
    }
  }
};

export const loginRequest: PopupRequest = {
  scopes: ["user_impersonation"],
  prompt: "select_account"
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};