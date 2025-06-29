
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  User, 
  Building, 
  Globe, 
  Database,
  Shield,
  Bell,
  Save,
  Edit,
  Eye,
  EyeOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const [profileSettings, setProfileSettings] = useState({
    madrasaName: 'Al-Noor Islamic Academy',
    adminName: 'Administrator',
    email: 'admin@madrasa.lk',
    phone: '+94 77 123 4567',
    address: 'Colombo, Sri Lanka',
    website: 'www.madrasa.lk'
  });

  const [systemSettings, setSystemSettings] = useState({
    timezone: 'Asia/Colombo',
    language: 'English',
    currency: 'LKR',
    dateFormat: 'DD/MM/YYYY',
    backupEnabled: true,
    maintenanceMode: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    sessionTimeout: 30
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Profile settings have been saved successfully.",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "System Updated",
      description: "System settings have been saved successfully.",
    });
  };

  const handleSaveSecurity = () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Password Error",
        description: "New passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Security Updated",
      description: "Security settings have been saved successfully.",
    });
    setSecuritySettings({
      ...securitySettings,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'system', label: 'System Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'database', label: 'Database', icon: Database }
  ];

  const renderProfileSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="madrasaName">Madrasa Name</Label>
          <Input
            id="madrasaName"
            value={profileSettings.madrasaName}
            onChange={(e) => setProfileSettings({...profileSettings, madrasaName: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="adminName">Admin Name</Label>
          <Input
            id="adminName"
            value={profileSettings.adminName}
            onChange={(e) => setProfileSettings({...profileSettings, adminName: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profileSettings.email}
            onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={profileSettings.phone}
            onChange={(e) => setProfileSettings({...profileSettings, phone: e.target.value})}
            placeholder="+94 XX XXX XXXX"
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={profileSettings.address}
            onChange={(e) => setProfileSettings({...profileSettings, address: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={profileSettings.website}
            onChange={(e) => setProfileSettings({...profileSettings, website: e.target.value})}
          />
        </div>
      </div>
      <Button onClick={handleSaveProfile} className="bg-emerald-600 hover:bg-emerald-700">
        <Save className="w-4 h-4 mr-2" />
        Save Profile Settings
      </Button>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <select
            id="timezone"
            value={systemSettings.timezone}
            onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
            <option value="Asia/Dubai">Asia/Dubai (UTC+4:00)</option>
            <option value="UTC">UTC (UTC+0:00)</option>
          </select>
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <select
            id="language"
            value={systemSettings.language}
            onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <select
            id="currency"
            value={systemSettings.currency}
            onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="LKR">Sri Lankan Rupee (LKR)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </div>
        <div>
          <Label htmlFor="dateFormat">Date Format</Label>
          <select
            id="dateFormat"
            value={systemSettings.dateFormat}
            onChange={(e) => setSystemSettings({...systemSettings, dateFormat: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
      <Button onClick={handleSaveSystem} className="bg-emerald-600 hover:bg-emerald-700">
        <Save className="w-4 h-4 mr-2" />
        Save System Settings
      </Button>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 max-w-md">
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showPassword ? "text" : "password"}
              value={securitySettings.currentPassword}
              onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={securitySettings.newPassword}
            onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={securitySettings.confirmPassword}
            onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
          <Input
            id="sessionTimeout"
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
          />
        </div>
      </div>
      <Button onClick={handleSaveSecurity} className="bg-emerald-600 hover:bg-emerald-700">
        <Save className="w-4 h-4 mr-2" />
        Update Security Settings
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-600">Manage system configuration and preferences</p>
      </div>

      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "bg-white shadow-sm" : ""}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {tabs.find(tab => tab.id === activeTab)?.icon && (
              <tabs.find(tab => tab.id === activeTab)!.icon className="w-5 h-5" />
            )}
            <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === 'profile' && renderProfileSettings()}
          {activeTab === 'system' && renderSystemSettings()}
          {activeTab === 'security' && renderSecuritySettings()}
          {activeTab === 'notifications' && (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Notification settings will be available soon.</p>
            </div>
          )}
          {activeTab === 'database' && (
            <div className="text-center py-8">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Database settings require special authentication.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsManagement;
