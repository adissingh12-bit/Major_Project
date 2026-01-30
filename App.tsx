
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './Sidebar';
import { ICONS } from './constants';
import { SensorData, Alert } from './types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', timestamp: '10:05:22', node: 'NODE-02', message: 'MR02BHA: Heart rate tracking initiated', type: 'INFO' },
    { id: '2', timestamp: '10:08:45', node: 'NODE-01', message: 'LPDA: RF Signal Gain within nominal limits', type: 'INFO' },
  ]);

  // Initial Mock Data for Phase-1
  const [nodes, setNodes] = useState<SensorData[]>([
    {
      id: 'NODE-01',
      name: 'Outside Perimeter',
      status: 'ONLINE',
      systemHealth: 98,
      lastUpdate: 'Just now',
      metrics: [
        { label: 'LPDA Gain', value: 12.4, unit: 'dBi' },
        { label: 'RF Noise', value: -92, unit: 'dBm' }
      ]
    },
    {
      id: 'NODE-02',
      name: 'Main Entry',
      status: 'ONLINE',
      systemHealth: 99,
      lastUpdate: 'Just now',
      metrics: [
        { label: 'Heart Rate', value: 72, unit: 'BPM' },
        { label: 'Breath Rate', value: 16, unit: 'RPM' }
      ]
    },
    {
      id: 'NODE-03',
      name: 'Ammunition Room',
      status: 'ONLINE',
      systemHealth: 100,
      lastUpdate: 'Just now',
      metrics: [
        { label: 'Temp', value: 24.2, unit: '°C' },
        { label: 'Smoke', value: 12, unit: 'PPM' }
      ]
    },
    {
      id: 'NODE-04',
      name: 'Command Room',
      status: 'ONLINE',
      systemHealth: 97,
      lastUpdate: 'Just now',
      metrics: [
        { label: 'CPU Temp', value: 42, unit: '°C' },
        { label: 'RAM Usage', value: 14, unit: '%' }
      ]
    },
    {
      id: 'NODE-05',
      name: 'Vehicle Zone',
      status: 'ONLINE',
      systemHealth: 99,
      lastUpdate: 'Just now',
      metrics: [
        { label: 'Incursion', value: 'NO', unit: '' },
        { label: 'Dist', value: 4.2, unit: 'm' }
      ]
    }
  ]);

  // Simulated live telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        metrics: node.metrics.map(m => {
          if (typeof m.value === 'number') {
            const variation = (Math.random() - 0.5) * 0.5;
            return { ...m, value: parseFloat((m.value + variation).toFixed(1)) };
          }
          return m;
        })
      })));

      // Occasional random alert
      if (Math.random() > 0.85) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        const newAlert: Alert = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          node: randomNode.id,
          message: `Periodic packet check: ${randomNode.id} signal verified.`,
          type: 'INFO'
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [nodes]);

  const chartData = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      time: i,
      value: 60 + Math.random() * 20
    }));
  }, []);

  return (
    <div className="flex min-h-screen bg-[#010409] text-slate-100 font-['Inter']">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 lg:p-10 overflow-y-auto">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">Military Automation Dashboard</h1>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.2em] mt-2">
              <span className="text-[#0ea5e9]">PHASE-1:</span> System Visualization & Telemetry Prototype
            </p>
          </div>
          <div className="bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 px-6 py-4 rounded-2xl max-w-xs">
            <p className="text-[10px] font-bold text-[#0ea5e9] uppercase mb-1">Prototype Note</p>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Backend MQTT + SQLite integration completed, live ESP32 streaming under development.
            </p>
          </div>
        </header>

        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {nodes.map(node => (
            <div key={node.id} className="bg-[#0d1117] border border-[#30363d] p-5 rounded-2xl hover:border-[#0ea5e9]/40 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-black text-slate-500 uppercase">{node.id}</span>
                <div className={`w-2 h-2 rounded-full ${node.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
              </div>
              <h3 className="text-sm font-bold text-white mb-1 truncate">{node.name}</h3>
              <p className="text-[10px] text-emerald-500/80 font-mono font-bold">{node.status} // {node.systemHealth}% Health</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Detailed Telemetry */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold uppercase italic text-white">Live Node Telemetry</h2>
                <span className="text-[10px] font-mono text-slate-500">POLLING_INTERVAL: 3000ms</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nodes.map(node => (
                  <div key={node.id + '-metrics'} className="bg-[#010409]/60 border border-[#30363d] p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-[#0ea5e9]">
                          <ICONS.Activity />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase">{node.id}</p>
                          <p className="text-xs font-bold text-white">{node.name}</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {node.metrics.map((m, i) => (
                        <div key={i}>
                          <p className="text-[8px] font-black text-slate-600 uppercase mb-1">{m.label}</p>
                          <p className="text-lg font-mono font-bold text-slate-200">
                            {m.value} <span className="text-[10px] text-slate-500 font-sans">{m.unit}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple Performance Chart */}
            <div className="glass-card p-8 rounded-3xl h-[300px]">
              <h3 className="text-sm font-bold uppercase text-slate-500 mb-6 tracking-widest">Network Stability (Last 10 Cycles)</h3>
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis hide />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #30363d' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alert Panel */}
          <div className="glass-card p-8 rounded-3xl flex flex-col h-full min-h-[500px]">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></div>
              <h2 className="text-lg font-bold uppercase italic text-white tracking-tighter">Event Logs</h2>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {alerts.map(alert => (
                <div key={alert.id} className="bg-[#010409] border-l-2 border-[#0ea5e9] p-4 rounded-r-xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-black text-[#0ea5e9] uppercase">{alert.node}</span>
                    <span className="text-[8px] font-mono text-slate-500">{alert.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
                    {alert.message}
                  </p>
                </div>
              ))}
              {alerts.length === 0 && (
                <p className="text-center text-slate-600 text-xs py-20">Awaiting system events...</p>
              )}
            </div>
            
            <button className="mt-8 w-full py-4 border border-[#30363d] rounded-xl text-[10px] font-black uppercase text-slate-500 hover:text-white hover:border-slate-500 transition-all">
              Clear History Log
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
