import React from 'react';
import { Clock, Droplet, Zap, BarChart2, TrendingUp, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const ComparisonMetric: React.FC<{
  title: string;
  current: number;
  previous: number;
  unit: string;
  icon: React.ReactNode;
  inverted?: boolean;
}> = ({ title, current, previous, unit, icon, inverted = false }) => {
  const diff = current - previous;
  const percentChange = Math.abs(Math.round((diff / previous) * 100));
  
  const isImprovement = inverted ? diff < 0 : diff > 0;
  const statusColor = isImprovement ? 'text-green-400' : 'text-red-400';

  return (
    <div className="bg-deepBlue-darker border border-blue-900/50 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <div className="text-gray-400 text-sm font-medium flex items-center">
          {icon}
          <span className="ml-1">{title}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Current Cycle</div>
          <div className="text-xl font-semibold text-white">{current}<span className="text-xs text-gray-400 ml-1">{unit}</span></div>
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Previous Cycle</div>
          <div className="text-xl font-semibold text-gray-400">{previous}<span className="text-xs text-gray-500 ml-1">{unit}</span></div>
        </div>
      </div>
      
      <div className={`text-sm ${statusColor} mt-3 flex items-center`}>
        {isImprovement ? (
          <>
            <ArrowUpCircle size={14} className="mr-1" />
            <span>Improved by {percentChange}%</span>
          </>
        ) : (
          <>
            <ArrowDownCircle size={14} className="mr-1" />
            <span>Decreased by {percentChange}%</span>
          </>
        )}
      </div>
    </div>
  );
};

const KPICard: React.FC<{
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, unit, icon, color }) => {
  return (
    <div className="bg-deepBlue-darker border border-blue-900/50 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <div className="text-gray-400 text-sm font-medium">{title}</div>
        <div className={color}>{icon}</div>
      </div>
      <div className="flex items-baseline">
        <div className="text-2xl font-semibold text-white">{value}</div>
        <div className="text-sm text-gray-400 ml-1">{unit}</div>
      </div>
    </div>
  );
};

const PerformancePanel: React.FC = () => {
  const { performanceData } = useDashboard();

  return (
    <div className="bg-deepBlue-light rounded-xl border border-blue-800 p-4 h-full">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
        <BarChart2 size={18} className="mr-2 text-electricBlue" />
        Performance Snapshot
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <ComparisonMetric 
          title="Cycle Time" 
          current={performanceData.cycleTime.current} 
          previous={performanceData.cycleTime.previous}
          unit="sec"
          icon={<Clock size={16} className="text-electricBlue" />}
          inverted={true}
        />
        <ComparisonMetric 
          title="Waste Output" 
          current={performanceData.wasteOutput.current} 
          previous={performanceData.wasteOutput.previous}
          unit="kg"
          icon={<Droplet size={16} className="text-blue-400" />}
          inverted={true}
        />
        <ComparisonMetric 
          title="Energy Usage" 
          current={performanceData.energyUsage.current} 
          previous={performanceData.energyUsage.previous}
          unit="kWh"
          icon={<Zap size={16} className="text-yellow-400" />}
          inverted={true}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <KPICard 
          title="Efficiency Score" 
          value={performanceData.efficiencyScore} 
          unit="/100" 
          icon={<TrendingUp size={18} />}
          color="text-neonGreen"
        />
        <KPICard 
          title="Downtime Saved" 
          value={performanceData.downtimeSaved} 
          unit="mins/day" 
          icon={<Clock size={18} />}
          color="text-electricBlue"
        />
        <KPICard 
          title="Material Wasted" 
          value={performanceData.materialWasted} 
          unit="kg/day" 
          icon={<Droplet size={18} />}
          color="text-blue-400"
        />
      </div>
    </div>
  );
};

export default PerformancePanel;