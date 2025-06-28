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
  Calendar,
  CheckCircle,
  XCircle
} from 'lucide-react';
import CompletionReportModal from './CompletionReportModal';
import { useToast } from '@/hooks/use-toast';

const ReportsManagement: React.FC = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  
  const [students, setStudents] = useState([
    {
      id: 'ST001',
      name: 'Ahmed Hassan',
      class: 'Class 8A',
      feeStatus: 'paid',
      totalFees: 25000,
      paidAmount: 25000,
      pendingAmount: 0,
      attendance: 92,
      guardian: 'Hassan Ali',
      phone: '+94 77 123 4567',
      admissionDate: '2023-04-15',
      performance: 'Excellent',
      completed: false
    },
    {
      id: 'ST002',
      name: 'Fatima Khan',
      class: 'Class 7B',
      feeStatus: 'pending',
      totalFees: 22500,
      paidAmount: 15000,
      pendingAmount: 7500,
      attendance: 88,
      guardian: 'Mohammed Khan',
      phone: '+94 71 234 5678',
      admissionDate: '2023-05-20',
      performance: 'Good',
      completed: false
    },
    {
      id: 'ST003',
      name: 'Omar Abdullah',
      class: 'Class 9A',
      feeStatus: 'paid',
      totalFees: 27500,
      paidAmount: 27500,
      pendingAmount: 0,
      attendance: 95,
      guardian: 'Abdullah Sheikh',
      phone: '+94 76 345 6789',
      admissionDate: '2023-03-10',
      performance: 'Outstanding',
      completed: false
    }
  ]);

  const [pastStudents, setPastStudents] = useState([
    {
      id: 'PST001',
      name: 'Abdullah Rahman',
      class: 'Class 10',
      graduationYear: '2023',
      finalGrade: 'A+',
      courseCompleted: 'Islamic Studies & Modern Education'
    }
  ]);

  const [staff] = useState([
    {
      id: 'SF001',
      name: 'Ustaz Ahmad',
      position: 'Head Teacher',
      department: 'Islamic Studies',
      salary: 125000,
      joiningDate: '2022-01-15',
      performance: 'Excellent'
    },
    {
      id: 'SF002',
      name: 'Sister Khadijah',
      position: 'Arabic Teacher',
      department: 'Languages',
      salary: 100000,
      joiningDate: '2022-03-20',
      performance: 'Very Good'
    }
  ]);

  const handleCompletionReport = (student: any) => {
    setSelectedStudent(student);
    setShowCompletionModal(true);
  };

  const handleComplete = (completionData: any) => {
    // Remove from current students and add to past students
    setStudents(prev => prev.filter(s => s.id !== completionData.originalId));
    setPastStudents(prev => [...prev, completionData]);
    
    toast({
      title: "Student Completed",
      description: `${completionData.name} moved to past students with grade ${completionData.finalGrade}.`,
    });
  };

  const handleIncomplete = (reason: string) => {
    // Mark student as incomplete but keep in current students
    setStudents(prev => prev.map(s => 
      s.id === selectedStudent.id 
        ? { ...s, completed: false, incompleteReason: reason }
        : s
    ));
    
    toast({
      title: "Course Marked Incomplete",
      description: `${selectedStudent.name} marked as incomplete.`,
      variant: "destructive"
    });
  };

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
          ['ID', 'Name', 'Class', 'Total Fees (LKR)', 'Paid Amount (LKR)', 'Pending Amount (LKR)', 'Attendance', 'Performance', 'Phone', 'Status'],
          ...students.map(student => [
            student.id,
            student.name,
            student.class,
            student.totalFees,
            student.paidAmount,
            student.pendingAmount,
            `${student.attendance}%`,
            student.performance,
            student.phone,
            student.completed ? 'Completed' : 'Ongoing'
          ])
        ].map(row => row.join(',')).join('\n')
      : [
          ['ID', 'Name', 'Position', 'Department', 'Salary (LKR)', 'Joining Date', 'Performance'],
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
    averageAttendance: Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length),
    completedStudents: students.filter(s => s.completed).length,
    ongoingStudents: students.filter(s => !s.completed).length
  });

  const summaryStats = getSummaryStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive reports and completion tracking</p>
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            <div className="text-2xl font-bold text-green-600">LKR {summaryStats.collectedFees.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Collected Fees</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-600">LKR {summaryStats.pendingFees.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Pending Fees</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-600">{summaryStats.ongoingStudents}</div>
            <div className="text-sm text-gray-600">Ongoing</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <GraduationCap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{pastStudents.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
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
                <span>Individual Student Reports & Completion Status</span>
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
                          <p className="text-xs text-gray-500">{student.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">Fees: LKR {student.paidAmount.toLocaleString()}/LKR {student.totalFees.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Attendance: {student.attendance}%</div>
                          <div className="flex space-x-2 mt-1">
                            <Badge variant={student.feeStatus === 'paid' ? 'default' : 'destructive'} className="text-xs">
                              {student.feeStatus === 'paid' ? 'Paid' : `Pending LKR ${student.pendingAmount.toLocaleString()}`}
                            </Badge>
                            <Badge variant={student.completed ? 'default' : 'secondary'} className={student.completed ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                              {student.completed ? (
                                <><CheckCircle className="w-3 h-3 mr-1" />Completed</>
                              ) : (
                                <><XCircle className="w-3 h-3 mr-1" />Ongoing</>
                              )}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => generateStudentReport(student)}
                            variant="outline"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Report
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleCompletionReport(student)}
                            className={student.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                          >
                            {student.completed ? (
                              <><CheckCircle className="w-4 h-4 mr-2" />Completed</>
                            ) : (
                              <><FileText className="w-4 h-4 mr-2" />Complete Course</>
                            )}
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
                          <div className="text-sm font-medium">Salary: LKR {member.salary.toLocaleString()}</div>
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

      {/* Completion Report Modal */}
      {showCompletionModal && selectedStudent && (
        <CompletionReportModal
          student={selectedStudent}
          onClose={() => {
            setShowCompletionModal(false);
            setSelectedStudent(null);
          }}
          onComplete={handleComplete}
          onIncomplete={handleIncomplete}
        />
      )}
    </div>
  );
};

export default ReportsManagement;
