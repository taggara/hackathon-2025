import { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID ?? "",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0:
            console.error(message);
            return;
          case 1:
            console.warn(message);
            return;
          case 2:
            console.info(message);
            return;
          case 3:
            console.debug(message);
            return;
          default:
            console.log(message);
            return;
        }
      },
      piiLoggingEnabled: false
    }
  }
};

export const loginRequest: PopupRequest = {
  scopes: [
    "User.Read",
    "Calendars.Read",
    "Mail.Read",
    "Tasks.Read",
    "Tasks.ReadWrite"
  ],
  prompt: "select_account"
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphMailEndpoint: "https://graph.microsoft.com/v1.0/me/messages",
  graphEventsEndpoint: "https://graph.microsoft.com/v1.0/me/events",
  graphTasksEndpoint: "https://graph.microsoft.com/v1.0/me/todo/lists"
};