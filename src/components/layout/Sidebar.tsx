
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    { id: 'fingerprint', label: 'Fingerprint', icon: Fingerprint, new: true },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'past-students', label: 'Past Students', icon: UserCheck },
    { id: 'database', label: 'Database', icon: Database, restricted: true },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'exams', label: 'Exams', icon: BookOpen, disabled: true }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 islamic-pattern">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">🕌</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 islamic-text">Madrasa</h1>
            <p className="text-xs text-gray-600">Management System</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? 'default' : 'ghost'}
            className={`w-full justify-start h-12 relative ${
              activeSection === item.id 
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                : 'hover:bg-gray-100'
            } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => !item.disabled && onSectionChange(item.id)}
            disabled={item.disabled}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.label}</span>
            
            {item.new && (
              <Badge className="ml-auto bg-green-500 text-white text-xs">NEW</Badge>
            )}
            
            {item.restricted && (
              <Badge variant="outline" className="ml-auto text-xs border-red-300 text-red-600">
                Auth Required
              </Badge>
            )}
            
            {item.disabled && (
              <Badge variant="outline" className="ml-auto text-xs">
                Soon
              </Badge>
            )}
          </Button>
        ))}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-2">Version 2.0</div>
          <div className="w-full h-1 bg-gray-200 rounded-full">
            <div className="w-3/4 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
