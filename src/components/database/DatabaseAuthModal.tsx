
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Database, Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DatabaseAuthModalProps {
  onClose: () => void;
  onAuthenticated: () => void;
}

const DatabaseAuthModal: React.FC<DatabaseAuthModalProps> = ({ onClose, onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [securityQuestion, setSecurityQuestion] = useState('');
  const { toast } = useToast();

  const handleLogin = () => {
    if (password === '123') {
      toast({
        title: "Database Access Granted",
        description: "Welcome to the database management system.",
      });
      onAuthenticated();
      onClose();
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleForgotPassword = () => {
    if (securityQuestion.toLowerCase().includes('madrasah') || securityQuestion.toLowerCase().includes('admin')) {
      toast({
        title: "Password Reset",
        description: "Your password is: 123",
      });
      setShowForgotPassword(false);
    } else {
      toast({
        title: "Security Question Failed",
        description: "Please contact administrator.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md m-4 animate-scale-in islamic-pattern">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <CardTitle>Database Authentication</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {!showForgotPassword ? (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <p className="text-gray-600">Enter database password to access system data</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Database Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pr-10"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="link" 
                  className="text-emerald-600 p-0"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={onClose}>Cancel</Button>
                  <Button onClick={handleLogin} className="bg-emerald-600 hover:bg-emerald-700">
                    Access Database
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">Password Recovery</h3>
                <p className="text-gray-600">Answer the security question to recover your password</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="security">What is the name of your institution?</Label>
                <Input
                  id="security"
                  type="text"
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  placeholder="Enter your answer"
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Login
                </Button>
                <Button onClick={handleForgotPassword} className="bg-emerald-600 hover:bg-emerald-700">
                  Recover Password
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseAuthModal;
