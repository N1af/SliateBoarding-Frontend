
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Save, Fingerprint, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddStudentFormProps {
  onClose: () => void;
  onSave: (student: any) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    age: '',
    guardianName: '',
    phone: '',
    email: '',
    address: '',
    feeStatus: 'pending'
  });
  
  const [fingerprintStatus, setFingerprintStatus] = useState<'pending' | 'scanning' | 'enrolled'>('pending');
  const [fingerprintData, setFingerprintData] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (fingerprintStatus !== 'enrolled') {
      toast({
        title: "Fingerprint Required",
        description: "Please enroll student's fingerprint before saving.",
        variant: "destructive"
      });
      return;
    }

    const newStudent = {
      id: `ST${String(Date.now()).slice(-3)}`,
      ...formData,
      age: parseInt(formData.age),
      admissionDate: new Date().toISOString().split('T')[0],
      attendance: 0,
      fingerprintId: fingerprintData
    };
    onSave(newStudent);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFingerprintEnroll = () => {
    setFingerprintStatus('scanning');
    // Simulate fingerprint scanning
    setTimeout(() => {
      const fingerprintId = `FP${Date.now()}`;
      setFingerprintData(fingerprintId);
      setFingerprintStatus('enrolled');
      toast({
        title: "Fingerprint Enrolled",
        description: "Student's fingerprint has been successfully enrolled.",
      });
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-scale-in islamic-pattern">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold">Add New Student</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fingerprint Section */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Fingerprint className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-emerald-800">Fingerprint Enrollment</h3>
                </div>
                {fingerprintStatus === 'enrolled' && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Enrolled
                  </Badge>
                )}
              </div>
              
              {fingerprintStatus === 'pending' && (
                <div className="text-center">
                  <p className="text-sm text-emerald-700 mb-3">
                    Please enroll the student's fingerprint for attendance verification
                  </p>
                  <Button 
                    type="button" 
                    onClick={handleFingerprintEnroll}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Start Fingerprint Enrollment
                  </Button>
                </div>
              )}
              
              {fingerprintStatus === 'scanning' && (
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                      <Fingerprint className="w-8 h-8 text-emerald-600" />
                    </div>
                  </div>
                  <p className="text-sm text-emerald-700">
                    Place finger on the scanner and hold still...
                  </p>
                </div>
              )}
              
              {fingerprintStatus === 'enrolled' && (
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-green-700">
                    Fingerprint enrolled successfully!
                  </p>
                </div>
              )}
            </div>

            {/* Student Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">Student Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-emerald-300 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="class" className="text-gray-700">Class</Label>
                <Input
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  placeholder="e.g., Class 8A"
                  className="border-emerald-300 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="age" className="text-gray-700">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  className="border-emerald-300 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="guardianName" className="text-gray-700">Guardian Name</Label>
                <Input
                  id="guardianName"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  className="border-emerald-300 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="border-emerald-300 focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-emerald-300 focus:border-emerald-500"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address" className="text-gray-700">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border-emerald-300 focus:border-emerald-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={fingerprintStatus !== 'enrolled'}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Student
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddStudentForm;
