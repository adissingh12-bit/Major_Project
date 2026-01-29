
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartData } from '../types';

interface ChartPanelProps {
  data: ChartData[];
  title: string;
  metric: string;
  color: string;
}

const ChartPanel: React.FC<ChartPanelProps> = ({ data, title, metric, color }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
        <div className="flex gap-2">
          <span className="text-xs font-medium px-2 py-1 bg-slate-800 rounded text-slate-400">Real-time</span>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ color: '#f8fafc' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="Living Room" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={false}
              animationDuration={300}
            />
            <Line 
              type="monotone" 
              dataKey="Bedroom" 
              stroke="#3b82f6" 
              strokeWidth={3} 
              dot={false}
              animationDuration={300}
            />
            <Line 
              type="monotone" 
              dataKey="Kitchen" 
              stroke="#f59e0b" 
              strokeWidth={3} 
              dot={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartPanel;
