import React from 'react';
import AccountSettings from './AccountSettings';
import IntegrationsSettings from './IntegrationsSettings';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <AccountSettings />
      <IntegrationsSettings />
    </div>
  );
};

export default SettingsPage;