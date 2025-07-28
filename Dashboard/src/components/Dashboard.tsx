import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MonitoringPanel from './MonitoringPanel';
import IntelligencePanel from './IntelligencePanel';
import PerformancePanel from './PerformancePanel';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <MonitoringPanel />
            <IntelligencePanel />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <PerformancePanel />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;