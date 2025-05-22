import React from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../services/msalConfig";
import { LogIn } from 'lucide-react';

const LoginButton: React.FC = () => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    console.log('🔑 Initiating login process...');
    try {
      console.log('📝 Login request configuration:', {
        scopes: loginRequest.scopes,
        prompt: loginRequest.prompt
      });
      
      const response = await instance.loginPopup(loginRequest);
      console.log('✅ Login successful:', {
        account: {
          username: response.account.username,
          environment: response.account.environment,
          tenantId: response.account.tenantId,
        },
        scopes: response.scopes,
        idTokenClaims: response.idTokenClaims
      });
    } catch (error) {
      console.error('❌ Login failed:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <LogIn size={20} />
      <span>Sign in with Microsoft</span>
    </button>
  );
};

export default LoginButton;