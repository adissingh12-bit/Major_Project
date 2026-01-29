
import React from 'react';
import { ICONS } from './constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tactical Hub', icon: ICONS.Dashboard },
    { id: 'analytics', label: 'Data Analytics', icon: ICONS.Activity },
    { id: 'settings', label: 'Node Config', icon: ICONS.Settings },
  ];

  return (
    <div className="w-72 bg-[#0d1117] border-r border-[#30363d] flex flex-col h-screen sticky top-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 text-[#00ff9d]">
          <ICONS.Zap />
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">Sentinel_X</h1>
        </div>
        <p className="text-[10px] text-slate-500 mt-2 uppercase font-black tracking-[0.3em]">Command & Control</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 border ${
              activeTab === item.id
                ? 'bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/30 shadow-[0_0_20px_rgba(0,255,157,0.05)]'
                : 'text-slate-500 border-transparent hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <item.icon />
            <span className="font-black text-[11px] uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-[#010409] border border-[#30363d] rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3 relative z-10">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">ESP32_GATEWAY</span>
            <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse"></div>
          </div>
          <p className="text-[11px] font-mono text-[#00ff9d]/70 relative z-10">HIVEMQ_BKR: CONNECTED</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
