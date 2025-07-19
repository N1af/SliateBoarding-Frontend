import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Search, 
  Download,
  Users,
  GraduationCap,
  DollarSign,
  AlertTriangle,
  Eye,
  Filter,
  Trash2,
  Edit,
  Shield
} from 'lucide-react';
import DatabasePermissionModal from './DatabasePermissionModal';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const DatabaseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const { toast } = useToast();
  
  

  // Fetch Students
  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then(data => setAllStudents(data))
      .catch(err => console.error('Failed to fetch students:', err));
  }, []);

  // Fetch Staff
  useEffect(() => {
    fetch('http://localhost:5000/api/staff')
      .then(res => res.json())
      .then(data => setAllStaff(data))
      .catch(err => console.error('Failed to fetch staff:', err));
  }, []);

  // Fetch Fees
  useEffect(() => {
    fetch('http://localhost:5000/api/fees')
      .then(res => res.json())
      .then(data => setAllFees(data))
      .catch(err => console.error('Failed to fetch fees:', err));
  }, []);

  const [allStudents, setAllStudents] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [allFees, setAllFees] = useState([]);


  const handleRequestAccess = () => {
    setShowPermissionModal(true);
  };

  const handleGrantAccess = () => {
    setHasAccess(true);
  };

  const handleDeleteRecord = async (type: string, id: string) => {
  try {
    await fetch(`http://localhost:5000/api/${type}/${id}`, {
      method: 'DELETE',
    });

    if (type === 'students') {
      setAllStudents(prev => prev.filter(s => s.id !== id));
    } else if (type === 'staff') {
      setAllStaff(prev => prev.filter(s => s.id !== id));
    } else if (type === 'fees') {
      setAllFees(prev => prev.filter(f => f.id !== id));
    }

    toast({
      title: "Record Deleted",
      description: `${type} record has been permanently deleted.`,
      variant: "destructive"
    });
  } catch (err) {
    console.error(`Failed to delete ${type} record:`, err);
  }
};


  const handleClearAllRecords = (type: string) => {
    if (window.confirm(`Are you sure you want to delete ALL ${type} records? This action cannot be undone.`)) {
      if (type === 'students') {
        setAllStudents([]);
      } else if (type === 'staff') {
        setAllStaff([]);
      } else if (type === 'fees') {
        setAllFees([]);
      }
      
      toast({
        title: "All Records Cleared",
        description: `All ${type} records have been permanently deleted.`,
        variant: "destructive"
      });
    }
  };

  const handleExportData = (type: string) => {
    let csvContent = '';
    
    switch (type) {
      case 'students':
        csvContent = [
          ['ID', 'Name', 'Class', 'Total Fees (LKR)', 'Paid Amount (LKR)', 'Phone', 'Fingerprint ID'],
          ...allStudents.map(s => [s.id, s.name, s.class, s.fees, s.paid, s.phone, s.fingerprint])
        ].map(row => row.join(',')).join('\n');
        break;
      case 'staff':
        csvContent = [
          ['ID', 'Name', 'Position', 'Department', 'Salary (LKR)', 'Phone'],
          ...allStaff.map(s => [s.id, s.name, s.position, s.department, s.salary, s.phone])
        ].map(row => row.join(',')).join('\n');
        break;
      case 'fees':
        csvContent = [
          ['ID', 'Student Name', 'Amount (LKR)', 'Status', 'Date'],
          ...allFees.map(f => [f.id, f.studentName, f.amount, f.status, f.date])
        ].map(row => row.join(',')).join('\n');
        break;
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_database_export.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Database Export Complete",
      description: `${type} data has been exported successfully.`,
    });
  };

  if (!hasAccess) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Database Access Required</h2>
          <p className="text-gray-600 mb-6">Administrator permissions needed to access database management.</p>
          <Button onClick={handleRequestAccess} className="bg-red-600 hover:bg-red-700">
            <Shield className="w-4 h-4 mr-2" />
            Request Access
          </Button>
        </div>
        
        {showPermissionModal && (
          <DatabasePermissionModal
            onClose={() => setShowPermissionModal(false)}
            onGrantAccess={handleGrantAccess}
          />
        )}
      </div>
    );
  }

  const filteredStudents = allStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = allStaff.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Management</h1>
          <p className="text-gray-600">Complete system database overview and management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Database className="w-8 h-8 text-emerald-600" />
          <Badge className="bg-green-100 text-green-800">Connected</Badge>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search across all database records..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Database Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{allStudents.length}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{allStaff.length}</div>
            <div className="text-sm text-gray-600">Staff Members</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-600">
              LKR {allStudents.reduce((sum, s) => sum + s.paid, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Collected</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-600">
              {allFees.filter(f => f.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending Payments</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Students Database</TabsTrigger>
          <TabsTrigger value="staff">Staff Database</TabsTrigger>
          <TabsTrigger value="fees">Fees Database</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Students Records ({filteredStudents.length})</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleClearAllRecords('students')} 
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                  <Button onClick={() => handleExportData('students')} className="bg-emerald-600 hover:bg-emerald-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Students
                  </Button>
                </div>
              </div>
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
                          <p className="text-xs text-gray-500">Phone: {student.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">Fees: LKR {student.paid.toLocaleString()}/LKR {student.fees.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Fingerprint: {student.fingerprint}</div>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteRecord('students', student.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Staff Records ({filteredStaff.length})</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleClearAllRecords('staff')} 
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                  <Button onClick={() => handleExportData('staff')} className="bg-emerald-600 hover:bg-emerald-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Staff
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStaff.map((staff) => (
                  <div key={staff.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{staff.name}</h3>
                          <p className="text-sm text-gray-600">{staff.position} • {staff.department}</p>
                          <p className="text-xs text-gray-500">Phone: {staff.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">Salary: LKR {staff.salary.toLocaleString()}</div>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteRecord('staff', staff.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Fee Records ({allFees.length})</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => handleClearAllRecords('fees')} 
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                  <Button onClick={() => handleExportData('fees')} className="bg-emerald-600 hover:bg-emerald-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export Fees
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allFees.map((fee) => (
                  <div key={fee.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{fee.studentName}</h3>
                        <p className="text-sm text-gray-600">{fee.id} • {fee.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">LKR {fee.amount.toLocaleString()}</div>
                          <Badge variant={fee.status === 'paid' ? 'default' : 'destructive'} className="mt-1">
                            {fee.status === 'paid' ? 'Paid' : 'Pending'}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteRecord('fees', fee.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DatabaseManagement;
