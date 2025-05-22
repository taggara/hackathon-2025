import React from 'react';
import { useMsal } from "@azure/msal-react";
import { User, Mail, Building2, Briefcase } from 'lucide-react';

const AccountSettings: React.FC = () => {
  const { accounts } = useMsal();
  const userAccount = accounts[0];

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 dark:text-white">Account Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-4 border dark:border-gray-700 rounded-lg">
          <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <span className="text-lg font-semibold">
              {userAccount?.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">{userAccount?.username}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Microsoft Account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border dark:border-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <User className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Display Name</p>
                <p className="font-medium dark:text-white">{userAccount?.name || 'Not set'}</p>
              </div>
            </div>
          </div>

          <div className="p-4 border dark:border-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium dark:text-white">{userAccount?.username}</p>
              </div>
            </div>
          </div>

          <div className="p-4 border dark:border-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Building2 className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Department</p>
                <p className="font-medium dark:text-white">O+O OmniSales Commerical</p>
              </div>
            </div>
          </div>

          <div className="p-4 border dark:border-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Briefcase className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Job Title</p>
                <p className="font-medium dark:text-white">Senior IT Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;