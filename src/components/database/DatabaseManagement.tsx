
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
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DatabaseManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [allStudents] = useState([
    { id: 'ST001', name: 'Ahmed Hassan', class: 'Class 8A', fees: 5000, paid: 5000, fingerprint: 'FP001' },
    { id: 'ST002', name: 'Fatima Khan', class: 'Class 7B', fees: 4500, paid: 3000, fingerprint: 'FP002' },
    { id: 'ST003', name: 'Omar Abdullah', class: 'Class 9A', fees: 5500, paid: 5500, fingerprint: 'FP003' }
  ]);

  const [allStaff] = useState([
    { id: 'SF001', name: 'Ustaz Ahmad', position: 'Head Teacher', salary: 25000, department: 'Islamic Studies' },
    { id: 'SF002', name: 'Sister Khadijah', position: 'Arabic Teacher', salary: 20000, department: 'Languages' }
  ]);

  const [allFees] = useState([
    { id: 'FE001', studentName: 'Ahmed Hassan', amount: 5000, status: 'paid', date: '2024-01-15' },
    { id: 'FE002', studentName: 'Fatima Khan', amount: 1500, status: 'pending', date: '2024-01-20' }
  ]);

  const handleExportData = (type: string) => {
    let csvContent = '';
    
    switch (type) {
      case 'students':
        csvContent = [
          ['ID', 'Name', 'Class', 'Total Fees', 'Paid Amount', 'Fingerprint ID'],
          ...allStudents.map(s => [s.id, s.name, s.class, s.fees, s.paid, s.fingerprint])
        ].map(row => row.join(',')).join('\n');
        break;
      case 'staff':
        csvContent = [
          ['ID', 'Name', 'Position', 'Department', 'Salary'],
          ...allStaff.map(s => [s.id, s.name, s.position, s.department, s.salary])
        ].map(row => row.join(',')).join('\n');
        break;
      case 'fees':
        csvContent = [
          ['ID', 'Student Name', 'Amount', 'Status', 'Date'],
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
              ₹{allStudents.reduce((sum, s) => sum + s.paid, 0).toLocaleString()}
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
                <Button onClick={() => handleExportData('students')} className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Students
                </Button>
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
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Fees: ₹{student.paid}/₹{student.fees}</div>
                        <div className="text-xs text-gray-500">Fingerprint: {student.fingerprint}</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
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
                <Button onClick={() => handleExportData('staff')} className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Staff
                </Button>
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
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Salary: ₹{staff.salary.toLocaleString()}</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
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
                <Button onClick={() => handleExportData('fees')} className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Fees
                </Button>
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
                      <div className="text-right">
                        <div className="text-sm font-medium">₹{fee.amount.toLocaleString()}</div>
                        <Badge variant={fee.status === 'paid' ? 'default' : 'destructive'} className="mt-1">
                          {fee.status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
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
