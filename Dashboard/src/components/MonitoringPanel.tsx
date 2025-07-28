import React from 'react';
import { Gauge, Thermometer, Wind, Activity } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import ConfidenceGauge from './charts/ConfidenceGauge';
import SpikeChart from './charts/SpikeChart';

const ParameterCard: React.FC<{
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
}> = ({ title, value, unit, icon, trend }) => {
  return (
    <div className="bg-deepBlue-darker border border-blue-900/50 rounded-lg p-4 hover:border-blue-700 transition-all">
      <div className="flex justify-between mb-2">
        <div className="text-gray-400 text-sm font-medium">{title}</div>
        <div className="text-neonGreen">{icon}</div>
      </div>
      <div className="flex items-baseline">
        <div className="text-2xl font-semibold text-white mr-1">{value}</div>
        <div className="text-sm text-gray-400">{unit}</div>
        {trend && (
          <div className={`ml-2 ${
            trend === 'up' ? 'text-green-400' : 
            trend === 'down' ? 'text-red-400' : 
            'text-gray-400'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </div>
        )}
      </div>
    </div>
  );
};

const MonitoringPanel: React.FC = () => {
  const { realTimeData } = useDashboard();

  return (
    <div className="bg-deepBlue-light rounded-xl border border-blue-800 p-4 h-full">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Activity size={18} className="mr-2 text-electricBlue" />
        Real-Time Monitoring
      </h2>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <ParameterCard 
          title="Pressure" 
          value={realTimeData.pressure} 
          unit="MPa" 
          icon={<Gauge size={18} />} 
          trend="stable"
        />
        <ParameterCard 
          title="Temperature" 
          value={realTimeData.temperature} 
          unit="°C" 
          icon={<Thermometer size={18} />} 
          trend="up"
        />
        <ParameterCard 
          title="Injection Speed" 
          value={realTimeData.injectionSpeed} 
          unit="cm³/s" 
          icon={<Wind size={18} />} 
          trend="down"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-deepBlue-darker border border-blue-900/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">SNN Activity Spikes</h3>
          <SpikeChart data={realTimeData.snnActivity} />
          <div className="text-xs text-gray-500 mt-2">Real-time neuromorphic neuron firing rate</div>
        </div>
        <div className="bg-deepBlue-darker border border-blue-900/50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Confidence Level</h3>
          <div className="flex items-center justify-center h-40">
            <ConfidenceGauge value={realTimeData.confidenceLevel} />
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold text-white">{realTimeData.confidenceLevel}%</div>
            <div className="text-xs text-gray-500">Prediction Confidence</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPanel;