import React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../services/msalConfig";
import { LogIn } from 'lucide-react';
import { AuthLogger } from '../../services/authLogger';

const LoginButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      AuthLogger.log(0, "Login attempt started");
      
      const response = await instance.loginPopup({
        ...loginRequest,
        extraScopesToConsent: ["user_impersonation"],
        claims: {
          id_token: {
            groups: { essential: true }
          },
          access_token: {
            groups: { essential: true }
          }
        }
      });
      
      AuthLogger.log(2, `Login successful for account: ${response.account?.username}`);
      
      // Log token details (excluding sensitive information)
      AuthLogger.log(3, `Token type: ${response.account?.homeAccountId ? "Full access" : "Limited"}`);
      AuthLogger.log(3, `Scopes granted: ${response.scopes?.join(", ")}`);
      
    } catch (error) {
      AuthLogger.log(0, `Login failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      console.error("Login failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <LogIn size={20} />
      <span>Sign in</span>
    </button>
  );
};

export default LoginButton;