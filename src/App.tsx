import React from 'react';
import AppLayout from './components/Layout/AppLayout';
import DashboardPage from './components/Dashboard/DashboardPage';

function App() {
  return (
    <AppLayout>
      <DashboardPage />
    </AppLayout>
  );
}

export default App;