
import React, { useState, useMemo } from 'react';
import Sidebar from './Sidebar';
import { ICONS } from './constants';
import { SensorData } from './types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  
  // Tactical 7-Node Architecture initialization
  const [nodes] = useState<Record<string, SensorData>>({
    'External Surveillance': { id: 'NODE-01', room: 'External Surveillance', presence: false, status: 'ONLINE', rfStatus: 'clear', systemHealth: 98, timestamp: '14:22:01' },
    'Main Entry': { id: 'NODE-02', room: 'Main Entry', presence: false, status: 'COMM_HANG', distance: 0, heartRate: 0, systemHealth: 32, timestamp: '14:21:44' },
    'Perimeter Zone A': { id: 'NODE-03', room: 'Perimeter Zone A', presence: false, status: 'SECURE', distance: 0, heartRate: 0, systemHealth: 99, timestamp: '14:22:05' },
    'Perimeter Zone B': { id: 'NODE-04', room: 'Perimeter Zone B', presence: false, status: 'SECURE', distance: 0, heartRate: 0, systemHealth: 99, timestamp: '14:22:05' },
    'Arms Storage': { id: 'NODE-05', room: 'Arms Storage', presence: false, status: 'ONLINE', temp: 18.2, humidity: 32, systemHealth: 100, timestamp: '14:22:03' },
    'Jammer Area': { id: 'NODE-06', room: 'Jammer Area', presence: false, status: 'SIGNAL_LOSS', temp: 0, voltage: 0, current: 0, systemHealth: 8, timestamp: '14:18:22' },
    'Control Room': { id: 'NODE-07', room: 'Control Room', presence: false, status: 'SECURE', temp: 21.8, heartRate: 0, systemHealth: 99, timestamp: '14:22:06' },
  });

  const analyticsData = useMemo(() => {
    return Object.values(nodes).map(node => ({
      name: node.room.replace('Perimeter Zone ', 'PZ-').split(' ')[0],
      health: node.systemHealth,
      thermal: node.temp || (node.status === 'ONLINE' || node.status === 'SECURE' ? 22 : 0),
    }));
  }, [nodes]);

  const toggleRoom = (room: string) => {
    setExpandedRoom(expandedRoom === room ? null : room);
  };

  const renderTelemetryGrid = (node: SensorData) => {
    const isHung = node.status === 'COMM_HANG' || node.status === 'SIGNAL_LOSS';
    
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-[#0d1117] border border-[#30363d] p-6 rounded-[2rem] relative overflow-hidden group/tile">
          <div className="flex items-center gap-2 text-[#ff2d55] mb-2">
            <ICONS.Heart /> <span className="text-[10px] font-black uppercase tracking-widest">BIO_HEART</span>
          </div>
          <div className={`text-4xl font-mono font-black ${isHung ? 'text-slate-800' : 'text-slate-100'}`}>
            {isHung ? '---' : '0'} <span className="text-[10px] text-slate-500">BPM</span>
          </div>
        </div>

        <div className="bg-[#0d1117] border border-[#30363d] p-6 rounded-[2rem] relative overflow-hidden group/tile">
          <div className="flex items-center gap-2 text-[#00ff9d] mb-2">
            <ICONS.Temp /> <span className="text-[10px] font-black uppercase tracking-widest">THERMAL</span>
          </div>
          <div className={`text-4xl font-mono font-black ${isHung ? 'text-slate-800' : 'text-slate-100'}`}>
            {isHung ? 'ERR' : `${node.temp || '0.0'}°C`}
          </div>
        </div>

        <div className="bg-[#0d1117] border border-[#30363d] p-6 rounded-[2rem] relative overflow-hidden group/tile">
          <div className="flex items-center gap-2 text-[#ffb800] mb-2">
            <ICONS.Zap /> <span className="text-[10px] font-black uppercase tracking-widest">BUS_VOLT</span>
          </div>
          <div className={`text-4xl font-mono font-black ${isHung ? 'text-slate-800' : 'text-slate-100'}`}>
            {isHung ? '0.00' : `${node.voltage || '0.0'}V`}
          </div>
        </div>

        <div className="bg-[#0d1117] border border-[#30363d] p-6 rounded-[2rem] relative overflow-hidden group/tile">
          <div className="flex items-center gap-2 text-[#00e5ff] mb-2">
            <ICONS.Shield /> <span className="text-[10px] font-black uppercase tracking-widest">ZONE_PROX</span>
          </div>
          <div className={`text-4xl font-mono font-black ${isHung ? 'text-slate-800' : 'text-slate-100'}`}>
            {isHung ? '--' : '0.0m'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#010409] text-slate-100 font-['Inter']">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#00ff9d 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

        <header className="mb-16 relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 bg-[#00ff9d] rounded-full animate-pulse shadow-[0_0_25px_#00ff9d]"></div>
              <span className="text-[11px] font-black tracking-[0.5em] text-[#00ff9d] uppercase opacity-80">TACTICAL_NETWORK_ESTABLISHED</span>
            </div>
            <h1 className="text-7xl xl:text-9xl font-black italic uppercase tracking-tighter text-white leading-[0.85] drop-shadow-2xl">
              GLOBAL_TACTICAL_HUB
            </h1>
            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest font-bold border-l-2 border-[#00ff9d]/40 pl-5 py-2">
              SESSION_ROOT_ADMIN // X-LINK ACTIVE // ENCRYPT_MODE: AES-256-GCM
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 relative z-10">
          <div className="lg:col-span-2 bg-[#0d1117]/60 border border-[#30363d] p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Sensor_Cross_Comparison</h2>
              <div className="flex gap-6">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#00ff9d] rounded-full"></div><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">HEALTH</span></div>
              </div>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0, 255, 157, 0.05)' }}
                    contentStyle={{ backgroundColor: '#010409', border: '1px solid #30363d', borderRadius: '24px' }}
                  />
                  <Bar dataKey="health" fill="#00ff9d" radius={[6, 6, 0, 0]} barSize={20}>
                    {analyticsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.health < 40 ? '#ff2d55' : '#00ff9d'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10 pb-32">
          {Object.values(nodes).map((node) => {
            const isExpanded = expandedRoom === node.room;
            const isHung = node.status === 'COMM_HANG' || node.status === 'SIGNAL_LOSS';

            return (
              <div 
                key={node.id}
                className={`group relative flex flex-col transition-all duration-700 rounded-[4.5rem] border overflow-hidden ${
                  isExpanded 
                    ? 'md:col-span-2 border-[#00ff9d]/50 bg-[#00ff9d]/[0.02] shadow-[0_80px_160px_rgba(0,255,157,0.1)]' 
                    : isHung 
                      ? 'border-[#ff2d55]/40 bg-[#ff2d55]/[0.04] hover:border-[#ff2d55]/60' 
                      : 'border-[#30363d] bg-[#0d1117]/40 hover:border-[#00ff9d]/40'
                }`}
              >
                <div className="p-12 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center border-2 ${isHung ? 'border-[#ff2d55]/50 text-[#ff2d55]' : 'border-[#30363d] text-slate-600'}`}>
                      {node.room.includes('Surveillance') ? <ICONS.Camera /> : <ICONS.Shield />}
                    </div>
                    <button 
                      onClick={() => toggleRoom(node.room)}
                      className="h-16 w-16 rounded-[1.8rem] flex items-center justify-center border-2 border-[#30363d] text-slate-500"
                    >
                      <ICONS.ChevronRight />
                    </button>
                  </div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">{node.room}</h3>
                  <div className="flex items-center gap-4 mt-5">
                    <span className={`text-[10px] font-black uppercase px-5 py-2 rounded-full border ${isHung ? 'border-[#ff2d55]/40 text-[#ff2d55]' : 'border-[#30363d] text-slate-500'}`}>
                      {node.status}
                    </span>
                  </div>
                  {isExpanded && renderTelemetryGrid(node)}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default App;
