import React from 'react';
import { Brain, Activity } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const Header: React.FC = () => {
  const { systemStatus } = useDashboard();

  return (
    <header className="bg-deepBlue-dark border-b border-blue-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Brain className="h-8 w-8 text-neonGreen mr-2" />
        <div>
          <h1 className="text-xl font-semibold text-white flex items-center">
            Neuro<span className="text-neonGreen">Mold</span>
            <span className="text-xs bg-blue-900 text-blue-100 px-2 py-0.5 rounded ml-2">v1.2</span>
          </h1>
          <p className="text-xs text-gray-400">Neuromorphic Control System</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <div className={`h-2 w-2 rounded-full mr-2 ${
            systemStatus === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-red-500'
          }`}></div>
          <span className="text-sm text-gray-300">
            {systemStatus === 'connected' ? 'Connected' : 'Offline'}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <Activity className="h-4 w-4 text-electricBlue mr-1" />
          <span>System Health: 97%</span>
        </div>
      </div>
    </header>
  );
};

export default Header;