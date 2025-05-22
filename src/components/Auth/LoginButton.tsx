import React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../services/msalConfig";
import { LogIn } from 'lucide-react';

const LoginButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup({
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
    }).catch(e => {
      console.error("Login failed:", e);
    });
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