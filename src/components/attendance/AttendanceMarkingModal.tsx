import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, CheckCircle, XCircle, Clock, Fingerprint, Shield, AlertCircle, Save } from 'lucide-react';
import FingerprintScanner from '../biometric/FingerprintScanner';
import { useToast } from '@/hooks/use-toast';

interface AttendanceMarkingModalProps {
  onClose: () => void;
  onMarkAttendance: (attendanceData: any) => void;
}

const AttendanceMarkingModal: React.FC<AttendanceMarkingModalProps> = ({ onClose, onMarkAttendance }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<Record<string, string>>({});
  const [showScanner, setShowScanner] = useState<string | null>(null);
  const { toast } = useToast();

  // 🔹 Fetch all students & today's attendance
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const [studentsRes, markedRes] = await Promise.all([
          fetch('http://localhost:5000/api/students'),
          fetch('http://localhost:5000/api/attendance/today'),
        ]);
        const studentsData = await studentsRes.json();
        const markedStudentIds: string[] = await markedRes.json();

        // Filter out students already marked today
        const unmarked = studentsData.filter((s: any) => !markedStudentIds.includes(s.id));
        setStudents(unmarked);

        const initialAttendance = unmarked.reduce((acc: any, student: any) => {
          acc[student.id] = { status: null, method: 'manual', verified: false, suspicious: false };
          return acc;
        }, {});
        setAttendanceData(initialAttendance);
      } catch (err) {
        console.error("Failed to fetch students or attendance:", err);
        toast({ title: "Error", description: "Failed to load student data.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleStatusChange = (studentId: string, status: string) => {
    if (!attendanceData[studentId]?.verified && attendanceData[studentId]?.method !== 'fingerprint') {
      setAttendanceData(prev => ({
        ...prev,
        [studentId]: { ...prev[studentId], status, method: 'manual' }
      }));
    }
  };

  const handleFingerprintScan = (studentId: string) => {
    setShowScanner(studentId);
  };

  const handleScanComplete = (scanResult: any) => {
    const studentId = scanResult.studentId;
    const student = students.find(s => s.id === studentId);

    if (scanResult.status === 'suspicious') {
      setVerificationStatus(prev => ({ ...prev, [studentId]: 'suspicious' }));
      setAttendanceData(prev => ({
        ...prev,
        [studentId]: {
          status: 'absent',
          method: 'fingerprint',
          verified: false,
          suspicious: true,
          suspiciousReason: 'Fingerprint mismatch - Identity verification required'
        }
      }));
      toast({
        title: "Suspicious Activity",
        description: `${scanResult.studentName}: Fingerprint doesn't match registered data.`,
        variant: "destructive"
      });
    } else if (scanResult.status === 'success') {
      const isStudentNameMatch = student?.name === scanResult.studentName;
      if (isStudentNameMatch) {
        setVerificationStatus(prev => ({ ...prev, [studentId]: 'verified' }));
        setAttendanceData(prev => ({
          ...prev,
          [studentId]: {
            status: 'present',
            method: 'fingerprint',
            verified: true,
            suspicious: false
          }
        }));
        toast({
          title: "Attendance Verified",
          description: `${scanResult.studentName}: Successfully verified and marked present.`
        });
      } else {
        setVerificationStatus(prev => ({ ...prev, [studentId]: 'suspicious' }));
        setAttendanceData(prev => ({
          ...prev,
          [studentId]: {
            status: 'absent',
            method: 'fingerprint',
            verified: false,
            suspicious: true,
            suspiciousReason: 'Student name mismatch - Wrong student attempting attendance'
          }
        }));
        toast({
          title: "Identity Mismatch",
          description: `Wrong student detected. Expected: ${student?.name}, Got: ${scanResult.studentName}`,
          variant: "destructive"
        });
      }
    } else {
      setVerificationStatus(prev => ({ ...prev, [studentId]: 'failed' }));
    }

    setShowScanner(null);
  };

  const handleSubmit = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const finalData = students.map(student => {
      const data = attendanceData[student.id];
      return {
        studentId: student.id,
        status: data.status,
        method: data.method,
        date: formattedDate,
        timeIn: data.status === 'present' || data.status === 'late' ? formattedTime : null,
        timeOut: null
      };
    });

    try {
      const res = await fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      if (!res.ok) {
        const err = await res.json();
        toast({ title: "Error", description: err.message, variant: "destructive" });
        return;
      }

      toast({ title: "Attendance Saved", description: "Records saved successfully." });
      onMarkAttendance(finalData); // Notify parent
      onClose(); // Close modal
    } catch (err) {
      console.error("Save error:", err);
      toast({ title: "Error", description: "Failed to save attendance.", variant: "destructive" });
    }
  };

  const getVerificationIcon = (studentId: string) => {
    const status = verificationStatus[studentId];
    switch (status) {
      case 'scanning': return <Fingerprint className="w-4 h-4 text-blue-600 animate-pulse" />;
      case 'verified': return <Shield className="w-4 h-4 text-green-600" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'suspicious': return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default: return <Fingerprint className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md">Loading students...</div>
    </div>
  );

  if (showScanner) {
    const student = students.find(s => s.id === showScanner);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <FingerprintScanner
          studentId={showScanner}
          studentName={student?.name || ''}
          onScanComplete={handleScanComplete}
          onCancel={() => setShowScanner(null)}
          isActive={true}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-emerald-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <CardTitle>Mark Attendance</CardTitle>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {students.map(student => (
            <div key={student.id} className="border-b py-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{student.name}</p>
                <p className="text-sm text-gray-500">{student.class} | ID: {student.id}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(student.id, 'present')}
                  disabled={attendanceData[student.id]?.method === 'fingerprint'}
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Present
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(student.id, 'absent')}
                >
                  <XCircle className="w-4 h-4 mr-1" /> Absent
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(student.id, 'late')}
                  disabled={attendanceData[student.id]?.method === 'fingerprint'}
                >
                  <Clock className="w-4 h-4 mr-1" /> Late
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleFingerprintScan(student.id)}
                  variant="outline"
                >
                  {getVerificationIcon(student.id)} <span className="ml-1">Scan</span>
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Save className="w-4 h-4 mr-2" /> Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceMarkingModal;
