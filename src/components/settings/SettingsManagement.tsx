import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Shield, 
  Users, 
  DollarSign, 
  Bell,
  Save,
  Lock,
  UserPlus,
  Trash2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsManagement: React.FC = () => {
  const { toast } = useToast();
  const [userRoles, setUserRoles] = useState([
    { id: 1, name: 'Admin', email: 'admin@madrasah.com', role: 'admin', permissions: ['all'] },
    { id: 2, name: 'Finance Manager', email: 'finance@madrasah.com', role: 'finance', permissions: ['fees', 'reports'] },
    { id: 3, name: 'Staff Coordinator', email: 'staff@madrasah.com', role: 'staff', permissions: ['attendance', 'students'] }
  ]);

  const [systemSettings, setSystemSettings] = useState({
    instituteName: 'Al-Madrasah Islamic School',
    address: '123 Education Street, Islamic City',
    phone: '+91 98765 43210',
    email: 'info@madrasah.com',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    academicYear: '2024-2025',
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    attendanceThreshold: 75,
    feeReminderDays: 7
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'staff',
    password: ''
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "System settings have been updated successfully.",
    });
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const permissions = newUser.role === 'admin' ? ['all'] : 
                         newUser.role === 'finance' ? ['fees', 'reports'] : 
                         ['attendance', 'students'];
      
      setUserRoles([...userRoles, {
        id: userRoles.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        permissions
      }]);
      
      setNewUser({ name: '', email: '', role: 'staff', password: '' });
      
      toast({
        title: "User Added",
        description: `${newUser.name} has been added with ${newUser.role} privileges.`,
      });
    }
  };

  const handleDeleteUser = (userId: number) => {
    setUserRoles(userRoles.filter(user => user.id !== userId));
    toast({
      title: "User Removed",
      description: "User has been removed from the system.",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'finance': return 'bg-green-100 text-green-800';
      case 'staff': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600">Manage system configuration and user access</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="islamic-pattern">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Institution Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instituteName">Institution Name</Label>
                  <Input
                    id="instituteName"
                    value={systemSettings.instituteName}
                    onChange={(e) => setSystemSettings({...systemSettings, instituteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Input
                    id="academicYear"
                    value={systemSettings.academicYear}
                    onChange={(e) => setSystemSettings({...systemSettings, academicYear: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={systemSettings.phone}
                    onChange={(e) => setSystemSettings({...systemSettings, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={systemSettings.email}
                    onChange={(e) => setSystemSettings({...systemSettings, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={systemSettings.currency}
                    onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={systemSettings.timezone}
                    onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={systemSettings.address}
                  onChange={(e) => setSystemSettings({...systemSettings, address: e.target.value})}
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">Notification Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoBackup">Automatic Backup</Label>
                      <p className="text-sm text-gray-500">Enable daily automatic backups</p>
                    </div>
                    <Switch
                      id="autoBackup"
                      checked={systemSettings.autoBackup}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoBackup: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Send email notifications for important events</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={systemSettings.emailNotifications}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, emailNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smsNotifications">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">Send SMS notifications for urgent matters</p>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={systemSettings.smsNotifications}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, smsNotifications: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="islamic-pattern">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Add New User */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Add New User</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newUserName">Full Name</Label>
                      <Input
                        id="newUserName"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newUserEmail">Email Address</Label>
                      <Input
                        id="newUserEmail"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newUserRole">Role</Label>
                      <select
                        id="newUserRole"
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="staff">Staff</option>
                        <option value="finance">Finance</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newUserPassword">Temporary Password</Label>
                      <Input
                        id="newUserPassword"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        placeholder="Enter temporary password"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddUser} className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>

                {/* Existing Users */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Current Users</h3>
                  {userRoles.map((user) => (
                    <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-semibold">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          <div className="text-xs text-gray-500">
                            {user.permissions.join(', ')}
                          </div>
                          {user.role !== 'admin' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="islamic-pattern">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-800">Database Security</h3>
                  </div>
                  <p className="text-amber-700 text-sm mb-4">
                    Current database password: <strong>123</strong>
                  </p>
                  <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                    Change Database Password
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="attendanceThreshold">Minimum Attendance (%)</Label>
                    <Input
                      id="attendanceThreshold"
                      type="number"
                      value={systemSettings.attendanceThreshold}
                      onChange={(e) => setSystemSettings({...systemSettings, attendanceThreshold: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feeReminderDays">Fee Reminder Days</Label>
                    <Input
                      id="feeReminderDays"
                      type="number"
                      value={systemSettings.feeReminderDays}
                      onChange={(e) => setSystemSettings({...systemSettings, feeReminderDays: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">System Health</h3>
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex justify-between">
                      <span>Database Status:</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Backup:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>System Version:</span>
                      <span>v1.0.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManagement;
