
import React from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  DollarSign, 
  Calendar,
  FileText,
  Settings,
  Database,
  Fingerprint,
  BookOpen,
  Trophy,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'staff', label: 'Staff', icon: GraduationCap },
    { id: 'fees', label: 'Fee Management', icon: DollarSign },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'exams', label: 'Exams', icon: BookOpen },
    { id: 'results', label: 'View Results', icon: Trophy },
    { id: 'fingerprint', label: 'Fingerprint', icon: Fingerprint },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'past-students', label: 'Past Students', icon: UserCheck },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-20 border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Madrasa</h1>
            <p className="text-sm text-gray-600">Management System</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-100px)]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`w-5 h-5 ${
              activeSection === item.id ? 'text-emerald-600' : 'text-gray-400'
            }`} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
