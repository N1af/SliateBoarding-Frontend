
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Fingerprint, 
  UserPlus, 
  Users, 
  Search, 
  Plus,
  X,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';
import FingerprintEnrollModal from './FingerprintEnrollModal';
import BulkEnrollModal from './BulkEnrollModal';
import { useToast } from '@/hooks/use-toast';

const FingerprintManagement: React.FC = () => {
  const [scanningMode, setScanningMode] = useState<'laptop' | 'machine'>('laptop');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showBulkEnroll, setShowBulkEnroll] = useState(false);
  const { toast } = useToast();

  const [enrolledFingerprints, setEnrolledFingerprints] = useState([
    { id: 'FP001', studentId: 'ST001', studentName: 'Ahmed Hassan', device: 'Laptop Sensor' },
    { id: 'FP002', studentId: 'ST002', studentName: 'Fatima Khan', device: 'Fingerprint Machine' },
    { id: 'FP003', studentId: 'ST003', studentName: 'Omar Abdullah', device: 'Laptop Sensor' }
  ]);

  const handleEnrollFingerprint = (fingerprintData: any) => {
    const newFingerprint = {
      id: `FP${String(enrolledFingerprints.length + 1).padStart(3, '0')}`,
      ...fingerprintData,
      device: scanningMode === 'laptop' ? 'Laptop Sensor' : 'Fingerprint Machine'
    };
    setEnrolledFingerprints([...enrolledFingerprints, newFingerprint]);
    toast({
      title: "Fingerprint Enrolled",
      description: `${fingerprintData.studentName}'s fingerprint has been successfully registered.`,
    });
  };

  const handleBulkEnrollment = (enrollmentData: any[]) => {
    const newFingerprints = enrollmentData.map((data, index) => ({
      id: `FP${String(enrolledFingerprints.length + index + 1).padStart(3, '0')}`,
      ...data,
      device: scanningMode === 'laptop' ? 'Laptop Sensor' : 'Fingerprint Machine'
    }));
    setEnrolledFingerprints([...enrolledFingerprints, ...newFingerprints]);
    toast({
      title: "Bulk Enrollment Complete",
      description: `${enrollmentData.length} fingerprints have been successfully enrolled.`,
    });
  };

  const handleDeleteFingerprint = (fingerprintId: string) => {
    setEnrolledFingerprints(enrolledFingerprints.filter(fp => fp.id !== fingerprintId));
    toast({
      title: "Fingerprint Deleted",
      description: "Fingerprint record has been deleted successfully.",
    });
  };

  const handleClearAllData = () => {
    setEnrolledFingerprints([]);
    toast({
      title: "All Data Cleared",
      description: "All fingerprint data has been cleared successfully.",
    });
  };

  const filteredFingerprints = enrolledFingerprints.filter(fp =>
    fp.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fp.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fingerprint Management</h1>
          <p className="text-gray-600">Manage biometric authentication and enrollment</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label>Scanning Device:</Label>
            <select
              value={scanningMode}
              onChange={(e) => setScanningMode(e.target.value as 'laptop' | 'machine')}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="laptop">Laptop Sensor</option>
              <option value="machine">Fingerprint Machine</option>
            </select>
          </div>
          <Button 
            variant="outline"
            onClick={handleClearAllData}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Data
          </Button>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => setShowBulkEnroll(true)}
          >
            <Users className="w-4 h-4 mr-2" />
            Bulk Enrollment
          </Button>
        </div>
      </div>

      {/* Device Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Fingerprint className="w-5 h-5" />
            <span>Device Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border-2 ${
              scanningMode === 'laptop' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Laptop Fingerprint Sensor</h3>
                  <p className="text-sm text-gray-600">Built-in biometric scanner</p>
                </div>
                <Badge variant={scanningMode === 'laptop' ? 'default' : 'secondary'}>
                  {scanningMode === 'laptop' ? 'Active' : 'Standby'}
                </Badge>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border-2 ${
              scanningMode === 'machine' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">External Fingerprint Machine</h3>
                  <p className="text-sm text-gray-600">Professional biometric device</p>
                </div>
                <Badge variant={scanningMode === 'machine' ? 'default' : 'secondary'}>
                  {scanningMode === 'machine' ? 'Active' : 'Standby'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{enrolledFingerprints.length}</div>
            <div className="text-sm text-gray-600">Total Fingerprints</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {enrolledFingerprints.filter(fp => fp.device === 'Laptop Sensor').length}
            </div>
            <div className="text-sm text-gray-600">Laptop Sensors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {enrolledFingerprints.filter(fp => fp.device === 'Fingerprint Machine').length}
            </div>
            <div className="text-sm text-gray-600">External Machines</div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by student name or ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowEnrollModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Enroll Fingerprint
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enrolled Fingerprints List */}
      <Card>
        <CardHeader>
          <CardTitle>Enrolled Fingerprints ({filteredFingerprints.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFingerprints.map((fingerprint) => (
              <div key={fingerprint.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Fingerprint className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{fingerprint.studentName}</h3>
                      <p className="text-sm text-gray-600">
                        ID: {fingerprint.studentId} • Device: {fingerprint.device}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{fingerprint.device}</Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteFingerprint(fingerprint.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showEnrollModal && (
        <FingerprintEnrollModal
          onClose={() => setShowEnrollModal(false)}
          onSave={handleEnrollFingerprint}
          scanningMode={scanningMode}
        />
      )}

      {showBulkEnroll && (
        <BulkEnrollModal
          onClose={() => setShowBulkEnroll(false)}
          onSave={handleBulkEnrollment}
          scanningMode={scanningMode}
        />
      )}
    </div>
  );
};

export default FingerprintManagement;
