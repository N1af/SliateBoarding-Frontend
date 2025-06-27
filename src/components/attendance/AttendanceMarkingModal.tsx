
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, XCircle, Clock, Fingerprint } from 'lucide-react';

interface AttendanceMarkingModalProps {
  onClose: () => void;
  onMarkAttendance: (attendanceData: any) => void;
}

const AttendanceMarkingModal: React.FC<AttendanceMarkingModalProps> = ({ onClose, onMarkAttendance }) => {
  const [students] = useState([
    { id: 'ST001', name: 'Ahmed Hassan', class: 'Class 8A', status: null },
    { id: 'ST002', name: 'Fatima Khan', class: 'Class 7B', status: null },
    { id: 'ST003', name: 'Omar Abdullah', class: 'Class 9A', status: null },
    { id: 'ST004', name: 'Aisha Begum', class: 'Class 6A', status: null },
  ]);

  const [attendanceData, setAttendanceData] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = { status: 'present', method: 'manual' };
      return acc;
    }, {} as Record<string, any>)
  );

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  const handleFingerprintScan = (studentId: string) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { status: 'present', method: 'fingerprint' }
    }));
  };

  const handleSubmit = () => {
    const finalData = students.map(student => ({
      ...student,
      ...attendanceData[student.id],
      date: new Date().toISOString().split('T')[0],
      timeIn: attendanceData[student.id].status === 'present' ? '08:30 AM' : null
    }));
    onMarkAttendance(finalData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4 animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-emerald-700">Mark Attendance - {new Date().toLocaleDateString()}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 font-semibold text-sm">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-600">ID: {student.id} • {student.class}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={attendanceData[student.id]?.status === 'present' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(student.id, 'present')}
                      className={attendanceData[student.id]?.status === 'present' ? 'bg-green-600 hover:bg-green-700' : ''}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={attendanceData[student.id]?.status === 'absent' ? 'destructive' : 'outline'}
                      onClick={() => handleStatusChange(student.id, 'absent')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Absent
                    </Button>
                    <Button
                      size="sm"
                      variant={attendanceData[student.id]?.status === 'late' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(student.id, 'late')}
                      className={attendanceData[student.id]?.status === 'late' ? 'bg-amber-600 hover:bg-amber-700' : ''}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Late
                    </Button>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFingerprintScan(student.id)}
                    className="border-blue-200 hover:bg-blue-50"
                  >
                    <Fingerprint className="w-4 h-4 mr-1" />
                    Scan
                  </Button>
                  
                  {attendanceData[student.id]?.method === 'fingerprint' && (
                    <Badge className="bg-blue-100 text-blue-800">Fingerprint</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-2 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceMarkingModal;
