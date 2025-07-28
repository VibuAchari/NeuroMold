import React, { createContext, useState, useContext, useEffect } from 'react';
import { generateMockData } from '../utils/mockData';

interface DashboardContextType {
  realTimeData: {
    pressure: number;
    temperature: number;
    injectionSpeed: number;
    confidenceLevel: number;
    snnActivity: number[];
  };
  adaptiveActions: {
    id: number;
    action: string;
    timestamp: string;
    status: 'success' | 'warning' | 'error';
  }[];
  performanceData: {
    cycleTime: { current: number; previous: number };
    wasteOutput: { current: number; previous: number };
    energyUsage: { current: number; previous: number };
    efficiencyScore: number;
    downtimeSaved: number;
    materialWasted: number;
  };
  systemStatus: 'connected' | 'offline';
  adaptiveMode: boolean;
  toggleAdaptiveMode: () => void;
  runTestCycle: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [realTimeData, setRealTimeData] = useState({
    pressure: 150,
    temperature: 220,
    injectionSpeed: 45,
    confidenceLevel: 87,
    snnActivity: Array(20).fill(0),
  });

  const [adaptiveActions, setAdaptiveActions] = useState([
    {
      id: 1,
      action: 'Pressure Auto-Calibrated',
      timestamp: '14:35:22',
      status: 'success' as const,
    },
    {
      id: 2,
      action: 'Temperature Adjusted',
      timestamp: '14:32:05',
      status: 'success' as const,
    },
    {
      id: 3,
      action: 'Anomaly Detected',
      timestamp: '14:27:18',
      status: 'warning' as const,
    },
  ]);

  const [performanceData, setPerformanceData] = useState({
    cycleTime: { current: 45, previous: 52 },
    wasteOutput: { current: 0.8, previous: 1.2 },
    energyUsage: { current: 138, previous: 152 },
    efficiencyScore: 92,
    downtimeSaved: 18.5,
    materialWasted: 0.8,
  });

  const [systemStatus, setSystemStatus] = useState<'connected' | 'offline'>('connected');
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  const toggleAdaptiveMode = () => {
    setAdaptiveMode(!adaptiveMode);
  };

  const runTestCycle = () => {
    // Simulate running a test cycle
    const newAction = {
      id: Date.now(),
      action: 'Test Cycle Initiated',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      status: Math.random() > 0.8 ? 'warning' as const : 'success' as const,
    };
    
    setAdaptiveActions(prev => [newAction, ...prev.slice(0, 4)]);
  };

  // Update real-time data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockData(realTimeData);
      setRealTimeData(newData);
    }, 2000);

    return () => clearInterval(interval);
  }, [realTimeData]);

  return (
    <DashboardContext.Provider
      value={{
        realTimeData,
        adaptiveActions,
        performanceData,
        systemStatus,
        adaptiveMode,
        toggleAdaptiveMode,
        runTestCycle,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};