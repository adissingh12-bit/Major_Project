
import React from 'react';
import { ICONS } from './constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Monitor Hub', icon: ICONS.Dashboard },
    { id: 'logs', label: 'Event Logs', icon: ICONS.Activity },
    { id: 'nodes', label: 'Hardware List', icon: ICONS.Zap },
  ];

  return (
    <div className="w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col h-screen sticky top-0 z-50">
      <div className="p-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[#0ea5e9]">
            <ICONS.Shield />
            <span className="text-xl font-black tracking-tighter text-white uppercase italic">AERO_LINK</span>
          </div>
          <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Prototype Ver 1.0</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border ${
              activeTab === item.id
                ? 'bg-[#0ea5e9]/10 text-[#0ea5e9] border-[#0ea5e9]/20 shadow-lg'
                : 'text-slate-400 border-transparent hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <item.icon />
            <span className="font-bold text-[11px] uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#30363d]">
        <div className="bg-[#010409] border border-[#30363d] rounded-xl p-4">
           <p className="text-[8px] font-black text-slate-600 uppercase mb-2">Researcher Info</p>
           <p className="text-[10px] font-bold text-white uppercase italic">Electronics Dept.</p>
           <p className="text-[9px] text-slate-500">Major Project Group 24</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
