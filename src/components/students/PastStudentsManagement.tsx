
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  GraduationCap, 
  Download,
  Eye,
  Calendar,
  Award,
  Phone,
  Mail,
  MapPin,
  BookOpen
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PastStudentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [pastStudents] = useState([
    {
      id: 'PST001',
      name: 'Abdullah Rahman',
      class: 'Class 10',
      graduationYear: '2023',
      phone: '+91 98765 43210',
      email: 'abdullah@email.com',
      address: 'Jamia Nagar, Delhi',
      finalGrade: 'A+',
      attendance: 96,
      courseCompleted: 'Islamic Studies & Modern Education',
      currentStatus: 'Higher Education',
      achievements: ['Best Student Award', 'Perfect Attendance'],
      graduationDate: '2023-03-15',
      guardian: 'Rahman Ali'
    },
    {
      id: 'PST002',
      name: 'Zainab Khatoon',
      class: 'Class 12',
      graduationYear: '2022',
      phone: '+91 87654 32109',
      email: 'zainab@email.com',
      address: 'Old Delhi',
      finalGrade: 'A',
      attendance: 92,
      courseCompleted: 'Arabic Literature & Islamic Studies',
      currentStatus: 'Teaching',
      achievements: ['Arabic Excellence Award', 'Leadership Award'],
      graduationDate: '2022-04-20',
      guardian: 'Mohammed Khatoon'
    },
    {
      id: 'PST003',
      name: 'Usman Ahmed',
      class: 'Class 11',
      graduationYear: '2023',
      phone: '+91 76543 21098',
      email: 'usman@email.com',
      address: 'Daryaganj, Delhi',
      finalGrade: 'B+',
      attendance: 88,
      courseCompleted: 'Quranic Studies & General Education',
      currentStatus: 'Working',
      achievements: ['Community Service Award'],
      graduationDate: '2023-05-10',
      guardian: 'Ahmed Hassan'
    },
    {
      id: 'PST004',
      name: 'Hafsa Begum',
      class: 'Class 9',
      graduationYear: '2024',
      phone: '+91 65432 10987',
      email: 'hafsa@email.com',
      address: 'Nizamuddin, Delhi',
      finalGrade: 'A',
      attendance: 94,
      courseCompleted: 'Hifz Program & Academic Studies',
      currentStatus: 'Continuing Education',
      achievements: ['Hifz Completion Certificate', 'Academic Excellence'],
      graduationDate: '2024-02-28',
      guardian: 'Begum Fatima'
    }
  ]);

  const filteredStudents = pastStudents.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.graduationYear.includes(searchTerm) ||
    student.courseCompleted.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (student: any) => {
    toast({
      title: "Student Details",
      description: `Viewing complete record for ${student.name} (${student.graduationYear})`,
    });
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Class', 'Graduation Year', 'Final Grade', 'Course', 'Current Status', 'Phone', 'Email'],
      ...filteredStudents.map(student => [
        student.id,
        student.name,
        student.class,
        student.graduationYear,
        student.finalGrade,
        student.courseCompleted,
        student.currentStatus,
        student.phone,
        student.email
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'past_students_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Past students data has been exported to CSV file.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'higher education': return 'bg-blue-100 text-blue-800';
      case 'teaching': return 'bg-green-100 text-green-800';
      case 'working': return 'bg-purple-100 text-purple-800';
      case 'continuing education': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-amber-100 text-amber-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Past Students</h1>
          <p className="text-gray-600">Alumni and graduated students records</p>
        </div>
        <Button onClick={handleExport} className="bg-emerald-600 hover:bg-emerald-700">
          <Download className="w-4 h-4 mr-2" />
          Export Alumni Data
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search by name, ID, year, or course..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <Graduate className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-600">{pastStudents.length}</div>
            <div className="text-sm text-gray-600">Total Alumni</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {pastStudents.filter(s => s.currentStatus === 'Higher Education').length}
            </div>
            <div className="text-sm text-gray-600">In Higher Ed</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-amber-600">
              {Math.round(pastStudents.reduce((acc, s) => acc + s.attendance, 0) / pastStudents.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Final Attendance</div>
          </CardContent>
        </Card>
        <Card className="islamic-pattern">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {[...new Set(pastStudents.map(s => s.graduationYear))].length}
            </div>
            <div className="text-sm text-gray-600">Graduation Years</div>
          </CardContent>
        </Card>
      </div>

      {/* Past Students List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Graduate className="w-5 h-5" />
            <span>Alumni Records ({filteredStudents.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-emerald-50/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">ID: {student.id} • Graduated {student.graduationYear}</p>
                      <p className="text-sm text-emerald-600 font-medium">{student.courseCompleted}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center text-xs text-gray-500">
                          <Phone className="w-3 h-3 mr-1" />
                          {student.phone}
                        </span>
                        <span className="flex items-center text-xs text-gray-500">
                          <Mail className="w-3 h-3 mr-1" />
                          {student.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getGradeColor(student.finalGrade)}>
                          Grade: {student.finalGrade}
                        </Badge>
                        <Badge className={getStatusColor(student.currentStatus)}>
                          {student.currentStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Final Attendance: {student.attendance}%
                      </p>
                      <p className="text-xs text-gray-500">
                        Achievements: {student.achievements.length}
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(student)}
                        className="hover:bg-emerald-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Achievements */}
                {student.achievements.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-gray-700">Achievements:</span>
                      <div className="flex flex-wrap gap-1">
                        {student.achievements.map((achievement, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
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

export default PastStudentsManagement;
