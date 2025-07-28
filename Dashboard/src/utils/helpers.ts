// Clamp a value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Format a number with specified precision
export const formatNumber = (value: number, precision: number = 1): number => {
  return Number(value.toFixed(precision));
};