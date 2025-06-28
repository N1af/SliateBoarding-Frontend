
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DatabasePermissionModalProps {
  onClose: () => void;
  onGrantAccess: () => void;
}

const DatabasePermissionModal: React.FC<DatabasePermissionModalProps> = ({ onClose, onGrantAccess }) => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (password === 'admin123') {
      onGrantAccess();
      toast({
        title: "Access Granted",
        description: "Database permissions activated successfully.",
      });
      onClose();
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 2) {
        toast({
          title: "Access Denied",
          description: "Too many failed attempts. Contact system administrator.",
          variant: "destructive"
        });
        onClose();
      } else {
        toast({
          title: "Invalid Credentials",
          description: `Incorrect password. ${2 - attempts} attempts remaining.`,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md m-4 animate-scale-in">
        <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <CardTitle>Database Access Control</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span className="text-amber-800 font-medium">Restricted Access</span>
              </div>
              <p className="text-sm text-amber-700 mt-1">
                Administrator credentials required to access database management features.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminPassword">Administrator Password</Label>
              <Input
                id="adminPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
            </div>

            <div className="flex justify-between items-center pt-4">
              <Badge variant="outline" className="text-xs">
                Attempts: {attempts}/3
              </Badge>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-red-600 hover:bg-red-700">
                  <Shield className="w-4 h-4 mr-2" />
                  Grant Access
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabasePermissionModal;
