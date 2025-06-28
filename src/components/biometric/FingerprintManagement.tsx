
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Fingerprint, 
  Search, 
  AlertTriangle,
  CheckCircle,
  Users,
  Plus,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FingerprintManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scanningMode, setScanningMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const { toast } = useToast();

  const [students] = useState([
    { id: 'ST001', name: 'Ahmed Hassan', class: 'Class 8A', fingerprint: 'FP001', enrolled: true },
    { id: 'ST002', name: 'Fatima Khan', class: 'Class 7B', fingerprint: 'FP002', enrolled: true },
    { id: 'ST003', name: 'Omar Abdullah', class: 'Class 9A', fingerprint: 'FP003', enrolled: true },
    { id: 'ST004', name: 'Aisha Begum', class: 'Class 6A', fingerprint: null, enrolled: false },
    { id: 'ST005', name: 'Ibrahim Ali', class: 'Class 8B', fingerprint: null, enrolled: false }
  ]);

  const [duplicateAlerts] = useState([
    { 
      fingerprint: 'FP001', 
      students: ['Ahmed Hassan', 'Ali Ahmed'], 
      severity: 'high',
      message: 'Same fingerprint detected for multiple students'
    }
  ]);

  const handleEnrollFingerprint = (studentId: string) => {
    setSelectedStudent(studentId);
    setScanningMode(true);
    
    // Simulate fingerprint scanning
    setTimeout(() => {
      const success = Math.random() > 0.1;
      setScanningMode(false);
      
      if (success) {
        toast({
          title: "Fingerprint Enrolled",
          description: "Student fingerprint has been successfully enrolled.",
        });
      } else {
        toast({
          title: "Enrollment Failed",
          description: "Failed to capture fingerprint. Please try again.",
          variant: "destructive"
        });
      }
    }, 3000);
  };

  const handleBulkEnrollment = () => {
    toast({
      title: "Bulk Enrollment Started",
      description: "Starting bulk fingerprint enrollment for all students without biometric data.",
    });
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unenrolledCount = students.filter(s => !s.enrolled).length;
  const duplicateCount = duplicateAlerts.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fingerprint Management</h1>
          <p className="text-gray-600">Manage student biometric data and authentication</p>
        </div>
        <Button onClick={handleBulkEnrollment} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Bulk Enrollment
        </Button>
      </div>

      {/* Alerts for Duplicates */}
      {duplicateAlerts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Security Alert:</strong> {duplicateCount} duplicate fingerprint(s) detected. 
            Please review and resolve immediately.
          </AlertDescription>
        </Alert>
      )}

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search students for fingerprint management..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{students.length}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{students.filter(s => s.enrolled).length}</div>
            <div className="text-sm text-gray-600">Enrolled</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <Fingerprint className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-600">{unenrolledCount}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{duplicateCount}</div>
            <div className="text-sm text-gray-600">Duplicates</div>
          </CardContent>
        </Card>
      </div>

      {/* Duplicate Alerts Section */}
      {duplicateAlerts.length > 0 && (
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-800 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Suspicious Fingerprint Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {duplicateAlerts.map((alert, index) => (
              <div key={index} className="bg-white border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-red-800">Duplicate Fingerprint: {alert.fingerprint}</h4>
                    <p className="text-sm text-red-600">
                      Found in: {alert.students.join(', ')}
                    </p>
                    <p className="text-xs text-red-500 mt-1">{alert.message}</p>
                  </div>
                  <Badge variant="destructive">High Risk</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Student Fingerprint Status ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.id} • {student.class}</p>
                      {student.fingerprint && (
                        <p className="text-xs text-gray-500">Fingerprint ID: {student.fingerprint}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge 
                        variant={student.enrolled ? 'default' : 'outline'}
                        className={student.enrolled ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                      >
                        {student.enrolled ? 'Enrolled' : 'Pending'}
                      </Badge>
                    </div>
                    
                    <div className="flex space-x-2">
                      {!student.enrolled && (
                        <Button 
                          size="sm"
                          onClick={() => handleEnrollFingerprint(student.id)}
                          disabled={scanningMode && selectedStudent === student.id}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Fingerprint className="w-4 h-4 mr-2" />
                          {scanningMode && selectedStudent === student.id ? 'Scanning...' : 'Enroll'}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {scanningMode && selectedStudent === student.id && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <Fingerprint className="w-5 h-5 text-blue-600 animate-pulse" />
                      <span className="text-blue-800 font-medium">Please place finger on scanner...</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FingerprintManagement;
