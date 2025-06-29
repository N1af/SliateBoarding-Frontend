
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, UserPlus, DollarSign, Calendar, Fingerprint } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
  onClearCount: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose, onClearCount }) => {
  const notifications = [
    {
      id: 1,
      title: "New Student Added",
      message: "Ahmed Hassan has been successfully registered",
      time: "2 minutes ago",
      icon: UserPlus,
      type: "success"
    },
    {
      id: 2,
      title: "Fee Payment Received",
      message: "Fatima Khan paid LKR 15,000 successfully",
      time: "5 minutes ago",
      icon: DollarSign,
      type: "success"
    },
    {
      id: 3,
      title: "Attendance Marked",
      message: "Omar Abdullah marked as Present",
      time: "10 minutes ago",
      icon: Calendar,
      type: "info"
    },
    {
      id: 4,
      title: "Fingerprint Enrolled",
      message: "Aisha Mohamed's fingerprint registered",
      time: "15 minutes ago",
      icon: Fingerprint,
      type: "success"
    }
  ];

  const handleMarkAllRead = () => {
    onClearCount();
    onClose();
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
        <CardTitle className="text-lg">Notifications</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
            Mark all read
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-4 border-b hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                notification.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <notification.icon className={`w-4 h-4 ${
                  notification.type === 'success' ? 'text-green-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </div>
  );
};

export default NotificationPanel;
