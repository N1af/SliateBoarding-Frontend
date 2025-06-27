
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
  Calendar,
  IndianRupee
} from 'lucide-react';

const StaffManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const staff = [
    {
      id: 'SF001',
      name: 'Dr. Mohd. Rashid',
      designation: 'Principal',
      department: 'Administration',
      phone: '+91 98765 43210',
      email: 'rashid.principal@madrasah.edu',
      joiningDate: '2020-01-15',
      salary: 75000,
      status: 'active',
      experience: '15 years'
    },
    {
      id: 'SF002',
      name: 'Ustad Ahmed Qureshi',
      designation: 'Islamic Studies Teacher',
      department: 'Islamic Studies',
      phone: '+91 87654 32109',
      email: 'ahmed.qureshi@madrasah.edu',
      joiningDate: '2021-06-20',
      salary: 45000,
      status: 'active',
      experience: '8 years'
    },
    {
      id: 'SF003',
      name: 'Prof. Fatima Begum',
      designation: 'Arabic Teacher',
      department: 'Languages',
      phone: '+91 76543 21098',
      email: 'fatima.begum@madrasah.edu',
      joiningDate: '2022-03-10',
      salary: 42000,
      status: 'active',
      experience: '10 years'
    },
    {
      id: 'SF004',
      name: 'Mr. Salman Khan',
      designation: 'Mathematics Teacher',
      department: 'Sciences',
      phone: '+91 65432 10987',
      email: 'salman.khan@madrasah.edu',
      joiningDate: '2023-01-15',
      salary: 38000,
      status: 'active',
      experience: '5 years'
    }
  ];

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage staff records, salaries, and information</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Staff
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
                placeholder="Search by name, ID, or designation..."
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

      {/* Staff Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">89</div>
            <div className="text-sm text-gray-600">Total Staff</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">85</div>
            <div className="text-sm text-gray-600">Active Staff</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">₹42.5L</div>
            <div className="text-sm text-gray-600">Monthly Payroll</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">12</div>
            <div className="text-sm text-gray-600">Departments</div>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStaff.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 font-semibold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">ID: {member.id} • {member.designation}</p>
                      <p className="text-sm text-gray-500">{member.department}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center text-xs text-gray-500">
                          <Phone className="w-3 h-3 mr-1" />
                          {member.phone}
                        </span>
                        <span className="flex items-center text-xs text-gray-500">
                          <Mail className="w-3 h-3 mr-1" />
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center text-lg font-semibold text-gray-900">
                        <IndianRupee className="w-4 h-4" />
                        {member.salary.toLocaleString()}
                      </div>
                      <p className="text-xs text-gray-500">Monthly Salary</p>
                      <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                        {member.status}
                      </Badge>
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

export default StaffManagement;
