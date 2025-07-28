import React, { useEffect, useRef } from 'react';

interface SpikeChartProps {
  data: number[];
}

const SpikeChart: React.FC<SpikeChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 15;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Draw background grid
    ctx.strokeStyle = '#1a2e4c';
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw the line
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const step = chartWidth / (data.length - 1);
    
    data.forEach((value, index) => {
      const x = padding + index * step;
      // Normalize value between 0 and 100, then scale to chart height
      const normalizedValue = (value / 100) * chartHeight;
      const y = height - padding - normalizedValue;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Add glow effect
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 5;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Draw dots at each data point
    data.forEach((value, index) => {
      const x = padding + index * step;
      const normalizedValue = (value / 100) * chartHeight;
      const y = height - padding - normalizedValue;
      
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Highlight effect for dots
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    
  }, [data]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={400} 
      height={180} 
      className="w-full h-40"
    />
  );
};

export default SpikeChart;