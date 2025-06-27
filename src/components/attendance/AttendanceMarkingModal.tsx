
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, XCircle, Clock, Fingerprint, Shield, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AttendanceMarkingModalProps {
  onClose: () => void;
  onMarkAttendance: (attendanceData: any) => void;
}

const AttendanceMarkingModal: React.FC<AttendanceMarkingModalProps> = ({ onClose, onMarkAttendance }) => {
  const [students] = useState([
    { id: 'ST001', name: 'Ahmed Hassan', class: 'Class 8A', status: null, fingerprintId: 'FP001' },
    { id: 'ST002', name: 'Fatima Khan', class: 'Class 7B', status: null, fingerprintId: 'FP002' },
    { id: 'ST003', name: 'Omar Abdullah', class: 'Class 9A', status: null, fingerprintId: 'FP003' },
    { id: 'ST004', name: 'Aisha Begum', class: 'Class 6A', status: null, fingerprintId: 'FP004' },
  ]);

  const [attendanceData, setAttendanceData] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = { status: 'present', method: 'manual', verified: false };
      return acc;
    }, {} as Record<string, any>)
  );

  const [verificationStatus, setVerificationStatus] = useState<Record<string, 'idle' | 'scanning' | 'verified' | 'failed'>>({});
  const { toast } = useToast();

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  const handleFingerprintVerification = (studentId: string) => {
    setVerificationStatus(prev => ({ ...prev, [studentId]: 'scanning' }));
    
    // Simulate fingerprint verification
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        setVerificationStatus(prev => ({ ...prev, [studentId]: 'verified' }));
        setAttendanceData(prev => ({
          ...prev,
          [studentId]: { status: 'present', method: 'fingerprint', verified: true }
        }));
        toast({
          title: "Fingerprint Verified",
          description: "Student identity verified successfully.",
        });
      } else {
        setVerificationStatus(prev => ({ ...prev, [studentId]: 'failed' }));
        toast({
          title: "Verification Failed",
          description: "Fingerprint not recognized. Please try again.",
          variant: "destructive"
        });
      }
    }, 2000);
  };

  const handleSubmit = () => {
    const finalData = students.map(student => ({
      ...student,
      ...attendanceData[student.id],
      date: new Date().toISOString().split('T')[0],
      timeIn: attendanceData[student.id].status === 'present' ? new Date().toLocaleTimeString() : null
    }));
    onMarkAttendance(finalData);
    onClose();
  };

  const getVerificationIcon = (studentId: string) => {
    const status = verificationStatus[studentId];
    switch (status) {
      case 'scanning':
        return <Fingerprint className="w-4 h-4 text-blue-600 animate-pulse" />;
      case 'verified':
        return <Shield className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Fingerprint className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4 animate-scale-in islamic-pattern">
        <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Mark Attendance</CardTitle>
              <p className="text-emerald-100 text-sm mt-1">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover-scale">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{student.name}</h4>
                      <p className="text-sm text-gray-600">ID: {student.id} • {student.class}</p>
                      {attendanceData[student.id]?.verified && (
                        <div className="flex items-center space-x-1 mt-1">
                          <Shield className="w-3 h-3 text-green-600" />
                          <span className="text-xs text-green-600">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {/* Status Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={attendanceData[student.id]?.status === 'present' ? 'default' : 'outline'}
                        onClick={() => handleStatusChange(student.id, 'present')}
                        className={attendanceData[student.id]?.status === 'present' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50'}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant={attendanceData[student.id]?.status === 'absent' ? 'destructive' : 'outline'}
                        onClick={() => handleStatusChange(student.id, 'absent')}
                        className="hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Absent
                      </Button>
                      <Button
                        size="sm"
                        variant={attendanceData[student.id]?.status === 'late' ? 'default' : 'outline'}
                        onClick={() => handleStatusChange(student.id, 'late')}
                        className={attendanceData[student.id]?.status === 'late' ? 'bg-amber-600 hover:bg-amber-700' : 'hover:bg-amber-50'}
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Late
                      </Button>
                    </div>
                    
                    {/* Fingerprint Verification */}
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleFingerprintVerification(student.id)}
                        disabled={verificationStatus[student.id] === 'scanning'}
                        className={`border-2 ${
                          verificationStatus[student.id] === 'verified' 
                            ? 'border-green-300 bg-green-50 hover:bg-green-100' 
                            : verificationStatus[student.id] === 'failed'
                            ? 'border-red-300 bg-red-50 hover:bg-red-100'
                            : 'border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {getVerificationIcon(student.id)}
                        <span className="ml-1 text-xs">
                          {verificationStatus[student.id] === 'scanning' && 'Scanning...'}
                          {verificationStatus[student.id] === 'verified' && 'Verified'}
                          {verificationStatus[student.id] === 'failed' && 'Failed'}
                          {!verificationStatus[student.id] && 'Scan'}
                        </span>
                      </Button>
                      
                      {attendanceData[student.id]?.method === 'fingerprint' && (
                        <Badge className="bg-blue-100 text-blue-800 animate-fade-in">
                          <Fingerprint className="w-3 h-3 mr-1" />
                          Biometric
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Total: {students.length} students • 
              Verified: {Object.values(verificationStatus).filter(s => s === 'verified').length} students
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-2" />
                Save Attendance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceMarkingModal;
