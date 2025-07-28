import React from 'react';
import Dashboard from './components/Dashboard';
import { DashboardProvider } from './context/DashboardContext';

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-deepBlue text-gray-100 font-ibm">
        <Dashboard />
      </div>
    </DashboardProvider>
  );
}

export default App;