
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
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import FingerprintScanner from './FingerprintScanner';
import { useToast } from '@/hooks/use-toast';

const FingerprintManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showBulkEnrollment, setShowBulkEnrollment] = useState(false);
  const [showScanner, setShowScanner] = useState<string | null>(null);
  const { toast } = useToast();

  const [students, setStudents] = useState([
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
      message: 'Same fingerprint detected for multiple students - SUSPICIOUS ACTIVITY'
    }
  ]);

  const handleEnrollFingerprint = (studentId: string) => {
    setShowScanner(studentId);
  };

  const handleScanComplete = (scanResult: any) => {
    if (scanResult.status === 'success') {
      setStudents(prev => prev.map(student => 
        student.id === scanResult.studentId 
          ? { ...student, fingerprint: scanResult.fingerprintId, enrolled: true }
          : student
      ));
      
      toast({
        title: "Fingerprint Enrolled",
        description: `${scanResult.studentName} fingerprint enrolled successfully.`,
      });
    }
    setShowScanner(null);
  };

  const handleBulkEnrollment = () => {
    setShowBulkEnrollment(true);
    const unenrolledStudents = students.filter(s => !s.enrolled);
    
    // Simulate bulk enrollment process
    let count = 0;
    const interval = setInterval(() => {
      if (count < unenrolledStudents.length) {
        const student = unenrolledStudents[count];
        setStudents(prev => prev.map(s => 
          s.id === student.id 
            ? { ...s, fingerprint: `FP_BULK_${s.id}`, enrolled: true }
            : s
        ));
        count++;
        
        toast({
          title: `Bulk Enrollment Progress`,
          description: `${count}/${unenrolledStudents.length} students enrolled.`,
        });
      } else {
        clearInterval(interval);
        setShowBulkEnrollment(false);
        toast({
          title: "Bulk Enrollment Complete",
          description: `All ${unenrolledStudents.length} students have been enrolled.`,
        });
      }
    }, 1000);
  };

  const handleDeleteFingerprint = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this fingerprint? This action cannot be undone.')) {
      setStudents(prev => prev.map(student =>
        student.id === studentId
          ? { ...student, fingerprint: null, enrolled: false }
          : student
      ));
      
      toast({
        title: "Fingerprint Deleted",
        description: "Student fingerprint has been removed from the system.",
        variant: "destructive"
      });
    }
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unenrolledCount = students.filter(s => !s.enrolled).length;
  const duplicateCount = duplicateAlerts.length;

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fingerprint Management</h1>
          <p className="text-gray-600">Manage student biometric data and authentication</p>
        </div>
        <Button 
          onClick={handleBulkEnrollment} 
          className="bg-emerald-600 hover:bg-emerald-700"
          disabled={showBulkEnrollment || unenrolledCount === 0}
        >
          <Plus className="w-4 h-4 mr-2" />
          {showBulkEnrollment ? 'Enrolling...' : `Bulk Enrollment (${unenrolledCount})`}
        </Button>
      </div>

      {/* Alerts for Duplicates */}
      {duplicateAlerts.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>SECURITY ALERT:</strong> {duplicateCount} duplicate fingerprint(s) detected. 
            This indicates SUSPICIOUS ACTIVITY - Please investigate immediately and verify student identities.
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
            <div className="text-sm text-gray-600">Suspicious</div>
          </CardContent>
        </Card>
      </div>

      {/* Duplicate Alerts Section */}
      {duplicateAlerts.length > 0 && (
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-800 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>SUSPICIOUS FINGERPRINT ACTIVITY - IMMEDIATE ATTENTION REQUIRED</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {duplicateAlerts.map((alert, index) => (
              <div key={index} className="bg-white border-2 border-red-300 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-red-800">Duplicate Fingerprint: {alert.fingerprint}</h4>
                    <p className="text-sm text-red-600">
                      Found in: {alert.students.join(', ')}
                    </p>
                    <p className="text-xs text-red-500 mt-1 font-medium">{alert.message}</p>
                  </div>
                  <Badge variant="destructive" className="animate-pulse">SUSPICIOUS</Badge>
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
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Fingerprint className="w-4 h-4 mr-2" />
                          Enroll
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {student.enrolled && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteFingerprint(student.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FingerprintManagement;
