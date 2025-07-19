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
import AddStaffForm from './AddStaffForm';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const StaffManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/staff');
        const data = await res.json();
        setStaff(data);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
  }, []);
  const [staff, setStaff] = useState<any[]>([]);

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = (newStaff: any) => {
    setStaff([...staff, newStaff]);
    toast({
      title: "Staff Added",
      description: `${newStaff.name} has been successfully added to the system.`,
    });
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Designation', 'Department', 'Phone', 'Email', 'Salary', 'Status'],
      ...filteredStaff.map(member => [
        member.id,
        member.name,
        member.designation,
        member.department,
        member.phone,
        member.email,
        member.salary,
        member.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'staff_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Staff data has been exported to CSV file.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600">Manage staff records, salaries, and information</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700 hover-scale"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Staff
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="hover:shadow-md transition-shadow duration-200">
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
            <Button variant="outline" className="hover-scale">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" onClick={handleExport} className="hover-scale">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Staff Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{staff.length}</div>
            <div className="text-sm text-gray-600">Total Staff</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{staff.filter(s => s.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Active Staff</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">₹{Math.round(staff.reduce((acc, s) => acc + s.salary, 0) / 100000 * 10) / 10}L</div>
            <div className="text-sm text-gray-600">Monthly Payroll</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">12</div>
            <div className="text-sm text-gray-600">Departments</div>
          </CardContent>
        </Card>
      </div>

      {/* Staff List */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle>Staff Records ({filteredStaff.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStaff.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover-scale">
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
                      <Button variant="ghost" size="sm" className="hover-scale">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover-scale">
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

      {/* Add Staff Modal */}
      {showAddForm && (
        <AddStaffForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddStaff}
        />
      )}
    </div>
  );
};

export default StaffManagement;
