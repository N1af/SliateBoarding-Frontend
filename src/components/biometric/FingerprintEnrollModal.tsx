
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Fingerprint } from 'lucide-react';

interface FingerprintEnrollModalProps {
  onClose: () => void;
  onSave: (data: any) => void;
  scanningMode: 'laptop' | 'machine';
}

const FingerprintEnrollModal: React.FC<FingerprintEnrollModalProps> = ({
  onClose,
  onSave,
  scanningMode
}) => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate fingerprint scanning
    setTimeout(() => {
      setIsScanning(false);
      if (studentId && studentName) {
        onSave({
          studentId,
          studentName
        });
        onClose();
      }
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-96">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Fingerprint className="w-5 h-5" />
            <span>Enroll Fingerprint</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="studentId">Student ID</Label>
            <Input
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter student ID"
            />
          </div>
          
          <div>
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name"
            />
          </div>

          <div className="text-center p-4 border rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Using: {scanningMode === 'laptop' ? 'Laptop Sensor' : 'Fingerprint Machine'}
            </p>
            {isScanning ? (
              <div className="text-blue-600">
                <Fingerprint className="w-8 h-8 mx-auto animate-pulse mb-2" />
                <p>Scanning fingerprint...</p>
              </div>
            ) : (
              <Button onClick={handleScan} disabled={!studentId || !studentName}>
                Start Fingerprint Scan
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FingerprintEnrollModal;
