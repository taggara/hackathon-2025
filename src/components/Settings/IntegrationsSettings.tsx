import React from 'react';
import { Slack, Mail, Cloud, Video, MessageSquareMore } from 'lucide-react';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  connected?: boolean;
  onClick: () => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ 
  title, 
  description, 
  icon, 
  connected = false,
  onClick 
}) => (
  <div className="p-4 border dark:border-gray-700 rounded-lg">
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="font-medium dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          connected
            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30'
        }`}
      >
        {connected ? 'Connected' : 'Connect'}
      </button>
    </div>
  </div>
);

const IntegrationsSettings: React.FC = () => {
  const handleConnect = (service: string) => {
    console.log(`Connecting to ${service}...`);
    // Demo connection logic would go here
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2 dark:text-white">Integrations</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Priortai works best with multiple connections.</p>
      
      <div className="space-y-4">
        <IntegrationCard
          title="Microsoft Teams"
          description="Connect your Microsoft Teams account"
          icon={<MessageSquareMore size={24} className="text-blue-500" />}
          connected={true}
          onClick={() => handleConnect('Microsoft')}
        />
        
        <IntegrationCard
          title="Slack"
          description="Connect your Slack workspace"
          icon={<Slack size={24} className="text-purple-500" />}
          connected={true}
          onClick={() => handleConnect('Slack')}
        />
        
        <IntegrationCard
          title="Google Workspace"
          description="Connect your Google Suite"
          icon={<Mail size={24} className="text-red-500" />}
          connected={true}
          onClick={() => handleConnect('Google')}
        />
        
        <IntegrationCard
          title="Zoom"
          description="Connect your Zoom account"
          icon={<Video size={24} className="text-blue-500" />}
          onClick={() => handleConnect('Zoom')}
        />
        
        <IntegrationCard
          title="Amazon Workspace"
          description="Connect your Amazon Workspace"
          icon={<Cloud size={24} className="text-yellow-500" />}
          onClick={() => handleConnect('Amazon')}
        />
      </div>
    </div>
  );
};

export default IntegrationsSettings;