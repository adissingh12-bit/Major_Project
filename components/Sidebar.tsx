
import React from 'react';
import { ICONS } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Dashboard },
    { id: 'devices', label: 'Node Network', icon: ICONS.Zap },
    { id: 'settings', label: 'Configuration', icon: ICONS.Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 text-emerald-400">
          <ICONS.Zap />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase italic">Sentinel_Pro</h1>
        </div>
        <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">IoT Command Center</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border ${
              activeTab === item.id
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon />
            <span className="font-bold text-sm uppercase tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Gateway</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
          </div>
          <p className="text-xs font-mono text-emerald-500/80">ws://local_host:8080</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
