
import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Types ---
interface Metric {
  label: string;
  value: string | number;
  unit: string;
}

interface NodeData {
  id: string;
  name: string;
  status: 'ONLINE' | 'OFFLINE';
  health: number;
  metrics: Metric[];
}

interface Alert {
  id: string;
  timestamp: string;
  node: string;
  message: string;
}

// --- Icons ---
const ICONS = {
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  Activity: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  Zap: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
};

// --- Sidebar Component ---
const Sidebar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (id: string) => void }) => {
  const items = [
    { id: 'dashboard', label: 'Monitor Hub', icon: ICONS.Dashboard },
    { id: 'logs', label: 'Event Logs', icon: ICONS.Activity },
    { id: 'nodes', label: 'Node Hardware', icon: ICONS.Zap },
  ];
  return (
    <aside className="w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col h-screen sticky top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-2 text-[#0ea5e9]">
          <ICONS.Shield />
          <span className="text-xl font-black tracking-tighter text-white uppercase italic">AERO_LINK</span>
        </div>
        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-[0.2em] block mt-1">Tactical Ver 1.0</span>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
              activeTab === item.id ? 'bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/20 shadow-lg' : 'text-slate-400 border-transparent hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <item.icon />
            <span className="font-bold text-[11px] uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-[#30363d]">
        <div className="bg-[#010409] border border-[#30363d] rounded-xl p-4 text-center">
          <p className="text-[8px] font-black text-slate-600 uppercase mb-1">System Health</p>
          <p className="text-[10px] font-bold text-emerald-500 uppercase italic">99.8% Nominal</p>
        </div>
      </div>
    </aside>
  );
};

// --- Main App ---
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', timestamp: '10:05:22', node: 'NODE-02', message: 'MR02BHA: Heart rate tracking active' },
    { id: '2', timestamp: '10:08:45', node: 'NODE-01', message: 'LPDA: RF Signal Gain optimized' },
  ]);

  const [nodes, setNodes] = useState<NodeData[]>([
    { id: 'NODE-01', name: 'Perimeter Alpha', status: 'ONLINE', health: 98, metrics: [{ label: 'Gain', value: 12.4, unit: 'dBi' }, { label: 'Noise', value: -92, unit: 'dBm' }] },
    { id: 'NODE-02', name: 'Access Point 1', status: 'ONLINE', health: 99, metrics: [{ label: 'Heart', value: 72, unit: 'BPM' }, { label: 'Breath', value: 16, unit: 'RPM' }] },
    { id: 'NODE-03', name: 'Storage Vault', status: 'ONLINE', health: 100, metrics: [{ label: 'Temp', value: 24.2, unit: '°C' }, { label: 'Smoke', value: 12, unit: 'PPM' }] },
    { id: 'NODE-04', name: 'Server Room', status: 'ONLINE', health: 97, metrics: [{ label: 'CPU', value: 42, unit: '°C' }, { label: 'RAM', value: 14, unit: '%' }] },
    { id: 'NODE-05', name: 'Garage Bay', status: 'ONLINE', health: 99, metrics: [{ label: 'Motion', value: 'None', unit: '' }, { label: 'Dist', value: 4.2, unit: 'm' }] }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        metrics: node.metrics.map(m => typeof m.value === 'number' ? { ...m, value: parseFloat((m.value + (Math.random() - 0.5) * 0.5).toFixed(1)) } : m)
      })));
      if (Math.random() > 0.9) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        setAlerts(prev => [{ id: Date.now().toString(), timestamp: new Date().toLocaleTimeString(), node: randomNode.id, message: `Status check: ${randomNode.id} transmitting normally.` }, ...prev].slice(0, 8));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [nodes]);

  const chartData = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({ time: i, value: 85 + Math.random() * 10 })), []);

  return (
    <div className="flex min-h-screen bg-[#010409] text-slate-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 lg:p-10 overflow-y-auto h-screen">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">Military Automation Hub</h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
              <span className="text-[#0ea5e9]">PHASE-1:</span> System Telemetry Prototype
            </p>
          </div>
          <div className="bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 px-6 py-4 rounded-2xl max-w-xs">
            <p className="text-[10px] font-bold text-[#0ea5e9] uppercase mb-1">Uplink Status</p>
            <p className="text-[11px] leading-relaxed text-slate-400 font-medium font-mono">
              SECURE_LINK // MQTT_READY // 128-BIT_ENC
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {nodes.map(node => (
            <div key={node.id} className="bg-[#0d1117] border border-[#30363d] p-5 rounded-2xl hover:border-[#0ea5e9]/40 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-black text-slate-500 uppercase">{node.id}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <h3 className="text-sm font-bold text-white mb-1 truncate">{node.name}</h3>
              <p className="text-[9px] text-emerald-500/80 font-mono font-bold uppercase tracking-widest">{node.status} // {node.health}%</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 rounded-3xl shadow-2xl">
              <h2 className="text-xl font-bold uppercase italic text-white mb-8">Live Telemetry Matrix</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nodes.map(node => (
                  <div key={node.id} className="bg-[#010409]/60 border border-[#30363d] p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-[#0ea5e9]">
                          <ICONS.Activity />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{node.id}</p>
                          <p className="text-xs font-bold text-white truncate">{node.name}</p>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {node.metrics.map((m, i) => (
                        <div key={i}>
                          <p className="text-[8px] font-black text-slate-600 uppercase mb-1 tracking-wider">{m.label}</p>
                          <p className="text-lg font-mono font-bold text-slate-200">
                            {m.value} <span className="text-[10px] text-slate-500 font-sans font-normal uppercase">{m.unit}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl h-[300px]">
              <h3 className="text-xs font-black uppercase text-slate-500 mb-6 tracking-[0.4em]">Signal Stability Index</h3>
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis hide />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.05} strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col min-h-[500px]">
            <h2 className="text-lg font-bold uppercase italic text-white mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
              Intel Logs
            </h2>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {alerts.map(alert => (
                <div key={alert.id} className="bg-[#010409] border-l border-[#0ea5e9] p-4 rounded-r-xl animate-in slide-in-from-right duration-500">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-black text-[#0ea5e9] uppercase tracking-widest">{alert.node}</span>
                    <span className="text-[8px] font-mono text-slate-600">{alert.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium leading-relaxed">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
