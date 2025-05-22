import React from 'react';
import AppLayout from './components/Layout/AppLayout';
import DashboardPage from './components/Dashboard/DashboardPage';
import SettingsPage from './components/Settings/SettingsPage';
import CalendarPage from './components/Calendar/CalendarPage';

function App() {
  const [currentPath, setCurrentPath] = React.useState('/');

  const renderPage = () => {
    switch (currentPath) {
      case '/settings':
        return <SettingsPage />;
      case '/calendar':
        return <CalendarPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppLayout onNavigate={setCurrentPath}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;