import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./services/msalConfig";
import { GraphService } from './services/graphService';
import App from './App.tsx';
import './index.css';

console.log('Initializing MSAL application...');
const msalInstance = new PublicClientApplication(msalConfig);

// Initialize Graph client after MSAL
GraphService.initializeGraphClient(msalInstance).catch(error => {
  console.error('Failed to initialize Graph client:', error);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>
);