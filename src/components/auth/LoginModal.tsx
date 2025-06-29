
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotName, setForgotName] = useState('');
  const [forgotAdminPassword, setForgotAdminPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleLogin = () => {
    if (username === 'madrasa' && password === '12345') {
      toast({
        title: "Login Successful",
        description: "Welcome to Madrasa Management System",
      });
      onLogin();
      onClose();
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive"
      });
    }
  };

  const handleForgotPassword = () => {
    if (step === 1) {
      if (forgotName && forgotAdminPassword === '12345') {
        setStep(2);
        toast({
          title: "Verification Successful",
          description: "You can now set a new password",
        });
      } else {
        toast({
          title: "Verification Failed",
          description: "Invalid name or admin password",
          variant: "destructive"
        });
      }
    } else {
      if (newPassword.length >= 6) {
        toast({
          title: "Password Reset Successful",
          description: "Your new password has been saved",
        });
        setShowForgotPassword(false);
        setStep(1);
        setForgotName('');
        setForgotAdminPassword('');
        setNewPassword('');
      } else {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 6 characters",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Lock className="w-6 h-6 text-emerald-600" />
            <span>{showForgotPassword ? 'Reset Password' : 'Admin Login'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showForgotPassword ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="link"
                  className="p-0 text-sm text-emerald-600"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot Password?
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleLogin} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  Login
                </Button>
              </div>
            </>
          ) : (
            <>
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="forgotName">Your Name</Label>
                    <Input
                      id="forgotName"
                      type="text"
                      placeholder="Enter your name"
                      value={forgotName}
                      onChange={(e) => setForgotName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="forgotAdminPassword">Admin Password</Label>
                    <Input
                      id="forgotAdminPassword"
                      type="password"
                      placeholder="Enter admin password"
                      value={forgotAdminPassword}
                      onChange={(e) => setForgotAdminPassword(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowForgotPassword(false);
                    setStep(1);
                  }} 
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={handleForgotPassword} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  {step === 1 ? 'Verify' : 'Save Password'}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginModal;
