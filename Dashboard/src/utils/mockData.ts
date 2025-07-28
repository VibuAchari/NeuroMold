import { clamp } from './helpers';

interface RealTimeData {
  pressure: number;
  temperature: number;
  injectionSpeed: number;
  confidenceLevel: number;
  snnActivity: number[];
}

// Generate random data with some constraints to simulate real-time data
export const generateMockData = (previousData: RealTimeData): RealTimeData => {
  // Add small random variations to each parameter
  const pressureChange = (Math.random() - 0.5) * 10;
  const temperatureChange = (Math.random() - 0.5) * 5;
  const speedChange = (Math.random() - 0.5) * 5;
  
  // Update confidence level with slight randomness
  const confidenceChange = (Math.random() - 0.5) * 4;
  
  // Shift SNN activity array and add new value
  const newSnnActivity = [...previousData.snnActivity.slice(1)];
  const lastValue = previousData.snnActivity[previousData.snnActivity.length - 1];
  // Generate new spike value with some correlation to previous value
  const newSpikeValue = clamp(
    lastValue + (Math.random() - 0.4) * 20,
    10, 
    90
  );
  
  newSnnActivity.push(newSpikeValue);
  
  return {
    pressure: clamp(previousData.pressure + pressureChange, 130, 170),
    temperature: clamp(previousData.temperature + temperatureChange, 200, 240),
    injectionSpeed: clamp(previousData.injectionSpeed + speedChange, 30, 60),
    confidenceLevel: clamp(previousData.confidenceLevel + confidenceChange, 70, 98),
    snnActivity: newSnnActivity,
  };
};