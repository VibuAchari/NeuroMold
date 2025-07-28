import React from 'react';
import { Brain, ToggleRight, Play, Clock } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const ActionLog: React.FC<{
  action: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}> = ({ action, timestamp, status }) => {
  const statusColor = 
    status === 'success' ? 'text-green-400' : 
    status === 'warning' ? 'text-yellow-400' : 
    'text-red-400';
    
  const statusBg = 
    status === 'success' ? 'bg-green-500/10' : 
    status === 'warning' ? 'bg-yellow-500/10' : 
    'bg-red-500/10';

  return (
    <div className="flex items-center mb-2 py-2 border-b border-blue-900/30 last:border-0">
      <div className={`w-2 h-2 rounded-full ${statusColor} mr-2`}></div>
      <div className="flex-1">
        <div className="text-sm text-white font-medium">{action}</div>
      </div>
      <div className="flex items-center text-xs text-gray-400">
        <Clock size={12} className="mr-1" />
        {timestamp}
      </div>
    </div>
  );
};

const IntelligencePanel: React.FC = () => {
  const { adaptiveActions, adaptiveMode, toggleAdaptiveMode, runTestCycle } = useDashboard();

  return (
    <div className="bg-deepBlue-light rounded-xl border border-blue-800 p-4 h-full">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Brain size={18} className="mr-2 text-neonGreen" />
        NeuroMold Intelligence
      </h2>
      
      <div className="mb-4 flex space-x-3">
        <button 
          onClick={runTestCycle}
          className="flex items-center px-4 py-2 bg-electricBlue text-deepBlue font-medium rounded-lg text-sm hover:bg-electricBlue/90 transition-colors"
        >
          <Play size={16} className="mr-1" /> Run Test Cycle
        </button>
        <button 
          onClick={toggleAdaptiveMode}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            adaptiveMode 
              ? 'bg-neonGreen/20 text-neonGreen border border-neonGreen/30' 
              : 'bg-blue-900/30 text-gray-400 border border-blue-900/50'
          }`}
        >
          <ToggleRight size={16} className="mr-1" /> 
          Adaptive Mode: {adaptiveMode ? 'ON' : 'OFF'}
        </button>
      </div>
      
      <div className="grid grid-rows-2 gap-4 h-[calc(100%-120px)]">
        <div className="bg-deepBlue-darker border border-blue-900/50 rounded-lg p-4 flex items-center justify-center relative overflow-hidden">
          <div className="z-10 text-center">
            <div className="text-lg font-semibold text-white mb-1">Neuromorphic Processing</div>
            <div className="text-sm text-electricBlue">SNN optimization active</div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="neuron-grid"></div>
          </div>
        </div>
        
        <div className="bg-deepBlue-darker border border-blue-900/50 rounded-lg p-4 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
            <Clock size={14} className="mr-1 text-electricBlue" /> Decision Logs
          </h3>
          <div>
            {adaptiveActions.map((action) => (
              <ActionLog 
                key={action.id}
                action={action.action}
                timestamp={action.timestamp}
                status={action.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligencePanel;