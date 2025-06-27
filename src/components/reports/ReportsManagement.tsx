
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Eye, 
  Filter,
  Users,
  GraduationCap,
  DollarSign,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportsManagement: React.FC = () => {
  const { toast } = useToast();
  
  const [students] = useState([
    {
      id: 'ST001',
      name: 'Ahmed Hassan',
      class: 'Class 8A',
      feeStatus: 'paid',
      totalFees: 5000,
      paidAmount: 5000,
      pendingAmount: 0,
      attendance: 92,
      guardian: 'Hassan Ali',
      phone: '+91 98765 43210',
      admissionDate: '2023-04-15',
      performance: 'Excellent'
    },
    {
      id: 'ST002',
      name: 'Fatima Khan',
      class: 'Class 7B',
      feeStatus: 'pending',
      totalFees: 4500,
      paidAmount: 3000,
      pendingAmount: 1500,
      attendance: 88,
      guardian: 'Mohammed Khan',
      phone: '+91 87654 32109',
      admissionDate: '2023-05-20',
      performance: 'Good'
    },
    {
      id: 'ST003',
      name: 'Omar Abdullah',
      class: 'Class 9A',
      feeStatus: 'paid',
      totalFees: 5500,
      paidAmount: 5500,
      pendingAmount: 0,
      attendance: 95,
      guardian: 'Abdullah Sheikh',
      phone: '+91 76543 21098',
      admissionDate: '2023-03-10',
      performance: 'Outstanding'
    }
  ]);

  const [staff] = useState([
    {
      id: 'SF001',
      name: 'Ustaz Ahmad',
      position: 'Head Teacher',
      department: 'Islamic Studies',
      salary: 25000,
      joiningDate: '2022-01-15',
      performance: 'Excellent'
    },
    {
      id: 'SF002',
      name: 'Sister Khadijah',
      position: 'Arabic Teacher',
      department: 'Languages',
      salary: 20000,
      joiningDate: '2022-03-20',
      performance: 'Very Good'
    }
  ]);

  const generateStudentReport = (student: any) => {
    const reportData = {
      ...student,
      reportDate: new Date().toLocaleDateString(),
      feesPercentage: Math.round((student.paidAmount / student.totalFees) * 100)
    };
    
    toast({
      title: "Student Report Generated",
      description: `Detailed report for ${student.name} has been generated.`,
    });
    
    return reportData;
  };

  const exportReport = (type: string) => {
    const csvContent = type === 'students' 
      ? [
          ['ID', 'Name', 'Class', 'Total Fees', 'Paid Amount', 'Pending Amount', 'Attendance', 'Performance'],
          ...students.map(student => [
            student.id,
            student.name,
            student.class,
            student.totalFees,
            student.paidAmount,
            student.pendingAmount,
            `${student.attendance}%`,
            student.performance
          ])
        ].map(row => row.join(',')).join('\n')
      : [
          ['ID', 'Name', 'Position', 'Department', 'Salary', 'Joining Date', 'Performance'],
          ...staff.map(member => [
            member.id,
            member.name,
            member.position,
            member.department,
            member.salary,
            member.joiningDate,
            member.performance
          ])
        ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Report Exported",
      description: `${type} report has been exported successfully.`,
    });
  };

  const getSummaryStats = () => ({
    totalStudents: students.length,
    totalFees: students.reduce((sum, s) => sum + s.totalFees, 0),
    collectedFees: students.reduce((sum, s) => sum + s.paidAmount, 0),
    pendingFees: students.reduce((sum, s) => sum + s.pendingAmount, 0),
    averageAttendance: Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)
  });

  const summaryStats = getSummaryStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive reports and data analysis</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportReport('students')}>
            <Download className="w-4 h-4 mr-2" />
            Export Students
          </Button>
          <Button variant="outline" onClick={() => exportReport('staff')}>
            <Download className="w-4 h-4 mr-2" />
            Export Staff
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{summaryStats.totalStudents}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">₹{summaryStats.collectedFees.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Collected Fees</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-600">₹{summaryStats.pendingFees.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Pending Fees</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-600">{summaryStats.averageAttendance}%</div>
            <div className="text-sm text-gray-600">Avg Attendance</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="students">Student Reports</TabsTrigger>
          <TabsTrigger value="staff">Staff Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Individual Student Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
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
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">Fees: ₹{student.paidAmount}/₹{student.totalFees}</div>
                          <div className="text-sm text-gray-500">Attendance: {student.attendance}%</div>
                          <Badge variant={student.feeStatus === 'paid' ? 'default' : 'destructive'} className="mt-1">
                            {student.feeStatus === 'paid' ? 'Paid' : `Pending ₹${student.pendingAmount}`}
                          </Badge>
                        </div>
                        
                        <Button 
                          size="sm" 
                          onClick={() => generateStudentReport(student)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Generate Report
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
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5" />
                <span>Staff Performance Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staff.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.position} • {member.department}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">Salary: ₹{member.salary.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Joined: {member.joiningDate}</div>
                          <Badge className="mt-1 bg-blue-100 text-blue-800">
                            {member.performance}
                          </Badge>
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toast({
                            title: "Staff Report Generated",
                            description: `Performance report for ${member.name} generated.`,
                          })}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Report
                        </Button>
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

export default ReportsManagement;
