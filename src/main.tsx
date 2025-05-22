import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./services/msalConfig";
import { GraphService } from './services/graphService';
import App from './App.tsx';
import './index.css';

const msalInstance = new PublicClientApplication(msalConfig);

// Initialize Graph client after MSAL
if (msalInstance.getAllAccounts().length > 0) {
  GraphService.initializeGraphClient(msalInstance);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>
);