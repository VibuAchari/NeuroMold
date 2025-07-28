import React from 'react';
import { LayoutDashboard, List, Settings, PieChart, Database, AlertTriangle } from 'lucide-react';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => {
  return (
    <div
      className={`flex items-center px-4 py-3 my-1 rounded-lg cursor-pointer transition-all hover:bg-blue-900 ${
        active ? 'bg-blue-900 text-neonGreen' : 'text-gray-400'
      }`}
    >
      <div className="mr-3">{icon}</div>
      <span className="text-sm">{label}</span>
      {active && <div className="h-full w-1 bg-neonGreen rounded absolute right-0"></div>}
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-deepBlue-darker w-56 hidden md:block p-3 border-r border-blue-900 relative">
      <div className="space-y-1 mt-4">
        <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
        <NavItem icon={<List size={18} />} label="Logs" />
        <NavItem icon={<Settings size={18} />} label="Model Config" />
        <NavItem icon={<PieChart size={18} />} label="Reports" />
        <NavItem icon={<Database size={18} />} label="Machine Data" />
        <NavItem icon={<AlertTriangle size={18} />} label="Anomalies" />
      </div>
      
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-blue-900/30 rounded-lg p-3 border border-blue-800">
          <h3 className="text-xs font-medium text-gray-300 mb-2">System Resources</h3>
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">SNN Memory</span>
              <span className="text-neonGreen">72%</span>
            </div>
            <div className="w-full bg-deepBlue rounded-full h-1.5">
              <div className="bg-neonGreen h-1.5 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Inference Load</span>
              <span className="text-electricBlue">38%</span>
            </div>
            <div className="w-full bg-deepBlue rounded-full h-1.5">
              <div className="bg-electricBlue h-1.5 rounded-full" style={{ width: '38%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;