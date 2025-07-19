// # AttendanceManagement.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle,
  Calendar as CalendarIcon,
  Fingerprint,
  Search,
  Filter
} from 'lucide-react';
import AttendanceMarkingModal from './AttendanceMarkingModal';
import { useToast } from '@/hooks/use-toast';

const AttendanceManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [showMarkingModal, setShowMarkingModal] = useState(false);
  const [showFingerprintSetup, setShowFingerprintSetup] = useState(false);
  const { toast } = useToast();

  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/attendance');
        const data = await res.json();
        setAttendanceData(data);
      } catch (err) {
        console.error('Failed to load attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const filteredAttendance = attendanceData.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkAttendance = (newAttendanceData: any[]) => {
    setAttendanceData(newAttendanceData);
    toast({
      title: "Attendance Marked",
      description: `Attendance recorded for ${newAttendanceData.length} students`,
    });
  };

  const handleFingerprintSetup = () => {
    setShowFingerprintSetup(true);
    toast({
      title: "Fingerprint Setup",
      description: "Fingerprint device setup initiated. Please follow device instructions.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge className="bg-amber-100 text-amber-800">Late</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const presentCount = attendanceData.filter(r => r.status === 'present').length;
  const absentCount = attendanceData.filter(r => r.status === 'absent').length;
  const lateCount = attendanceData.filter(r => r.status === 'late').length;
  const totalStudents = attendanceData.length;
  const attendanceRate = ((presentCount + lateCount) / totalStudents * 100).toFixed(1);
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md">Loading student data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Track and manage student attendance with fingerprint integration</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handleFingerprintSetup}
            className="hover-scale"
          >
            <Fingerprint className="w-4 h-4 mr-2" />
            Fingerprint Setup
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 hover-scale"
            onClick={() => setShowMarkingModal(true)}
          >
            <Clock className="w-4 h-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalStudents}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
            <div className="text-sm text-gray-600">Present</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
            <div className="text-sm text-gray-600">Absent</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{lateCount}</div>
            <div className="text-sm text-gray-600">Late</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{attendanceRate}%</div>
            <div className="text-sm text-gray-600">Attendance Rate</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5" />
              <span>Select Date</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Attendance List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search students..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="hover-scale">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle>
                Today's Attendance - {selectedDate.toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredAttendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-200 hover-scale">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-700 font-semibold text-sm">
                          {record.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{record.name}</h4>
                        <p className="text-sm text-gray-600">ID: {record.id} • {record.class}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {record.timeIn && (
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Time In</p>
                          <p className="text-sm font-medium">{record.timeIn}</p>
                        </div>
                      )}
                      
                      {record.timeOut && (
                        <div className="text-center">
                          <p className="text-xs text-gray-500">Time Out</p>
                          <p className="text-sm font-medium">{record.timeOut}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(record.status)}
                        {record.method === 'fingerprint' && (
                          <Fingerprint className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fingerprint Integration Info */}
      <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Fingerprint className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">Fingerprint Integration</h3>
              <p className="text-sm text-blue-700">
                Seamlessly integrate with fingerprint devices for automated attendance tracking. 
                Contact technical support for device configuration and setup.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showMarkingModal && (
        <AttendanceMarkingModal
          onClose={() => setShowMarkingModal(false)}
          onMarkAttendance={handleMarkAttendance}
        />
      )}
    </div>
  );
};

export default AttendanceManagement;
