
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Filter, 
  Download,
  Edit,
  Eye,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const StudentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: 'ST001',
      name: 'Ahmed Hassan',
      class: 'Class 8A',
      age: 14,
      guardianName: 'Hassan Ali',
      phone: '+91 98765 43210',
      email: 'hassan.ahmed@email.com',
      address: 'Daryaganj, Delhi',
      feeStatus: 'paid',
      admissionDate: '2023-04-15',
      attendance: 92
    },
    {
      id: 'ST002',
      name: 'Fatima Khan',
      class: 'Class 7B',
      age: 13,
      guardianName: 'Mohammed Khan',
      phone: '+91 87654 32109',
      email: 'khan.fatima@email.com',
      address: 'Jamia Nagar, Delhi',
      feeStatus: 'pending',
      admissionDate: '2023-05-20',
      attendance: 88
    },
    {
      id: 'ST003',
      name: 'Omar Abdullah',
      class: 'Class 9A',
      age: 15,
      guardianName: 'Abdullah Sheikh',
      phone: '+91 76543 21098',
      email: 'omar.abdullah@email.com',
      address: 'Old Delhi',
      feeStatus: 'paid',
      admissionDate: '2023-03-10',
      attendance: 95
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Manage student records, admissions, and information</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Student
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by name, ID, or class..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1,156</div>
            <div className="text-sm text-gray-600">Active Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">91</div>
            <div className="text-sm text-gray-600">Pending Fees</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">92.5%</div>
            <div className="text-sm text-gray-600">Avg Attendance</div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-700 font-semibold text-lg">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">ID: {student.id} • {student.class}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center text-xs text-gray-500">
                          <Phone className="w-3 h-3 mr-1" />
                          {student.phone}
                        </span>
                        <span className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {student.address}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge 
                        variant={student.feeStatus === 'paid' ? 'default' : 'destructive'}
                        className={student.feeStatus === 'paid' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {student.feeStatus === 'paid' ? 'Fee Paid' : 'Fee Pending'}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        Attendance: {student.attendance}%
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
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

export default StudentManagement;
