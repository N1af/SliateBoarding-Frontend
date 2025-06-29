
import React, { useState } from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NotificationPanel from '../notifications/NotificationPanel';

interface HeaderProps {
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount, setNotificationCount] = useState(4);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleClearNotifications = () => {
    setNotificationCount(0);
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white shadow-sm border-b border-gray-200 z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Madrasa Management System</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  {notificationCount}
                </Badge>
              )}
            </Button>
            
            {showNotifications && (
              <NotificationPanel
                onClose={() => setShowNotifications(false)}
                onClearCount={handleClearNotifications}
              />
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Admin</span>
            </Button>
            
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="font-medium text-gray-900">Administrator</div>
                  <div className="text-sm text-gray-600">admin@madrasa.lk</div>
                </div>
                
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
