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
  MapPin,
  GraduationCap
} from 'lucide-react';
import AddStudentForm from './AddStudentForm';
import StudentDetailsModal from './StudentDetailsModal';
import CourseCompletionModal from './CourseCompletionModal';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import axios from 'axios';
import { Student, CourseCompletionData } from '../types/student';

// In a shared types file or inside StudentManagement.tsx


const StudentManagement: React.FC = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCourseCompletion, setShowCourseCompletion] = useState(false);
  const [filterClass, setFilterClass] = useState('');
  const { toast } = useToast();
  
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then(res => res.json())
      .then((data: Student[]) => setStudents(data))
      .catch(err => {
        console.error("Failed to fetch students", err);
        toast({
          title: "Fetch Error",
          description: "Could not load student data.",
          variant: "destructive"
        });
      });
  }, [toast]); // ✅ include toast in dependency array

  const handleCompleteStudentCourse = (student: Student) => {
    setSelectedStudent(student);
    setShowCourseCompletion(true);
  };


  

  const handleCourseCompletion = async (completionData: CourseCompletionData) => {
    try {
      await axios.post('http://localhost:5000/api/graduates/graduate', completionData);
      setStudents(prev => prev.filter(s => s.id !== completionData.originalId));
      
      toast({
        title: 'Student Graduated',
        description: `${completionData.name} has been added to alumni.`,
      });
    } catch (error) {
      console.error('Error saving graduate:', error);
      toast({
        title: 'Error',
        description: 'Failed to save graduate to the system.',
        variant: 'destructive',
      });
    }
  };



  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterClass === '' || student.class.includes(filterClass);
    return matchesSearch && matchesFilter;
  });

  const handleAddStudent = (newStudent: Student) => {
    fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStudent)
    })
    .then(res => res.json())
    .then(() => {
      setStudents(prev => [...prev, newStudent]);
      toast({
        title: "Student Added",
        description: `${newStudent.name} has been successfully added.`,
      });
    })
    .catch(err => {
      console.error("Add student failed", err);
      toast({
        title: "Error",
        description: "Could not add student.",
        variant: "destructive"
      });
    });
  };


  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  const handleEditStudent = (student: Student) => {
    toast({
      title: "Edit Student",
      description: `Edit functionality for ${student.name} - Coming soon!`,
    });
  };

  const handleFilter = () => {
    const classes = [...new Set(students.map(s => s.class))];
    const nextClass = classes[Math.floor(Math.random() * classes.length)];
    setFilterClass(filterClass === nextClass ? '' : nextClass);
    toast({
      title: "Filter Applied",
      description: filterClass === nextClass ? "Filter cleared" : `Filtered by ${nextClass}`,
    });
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Class', 'Age', 'Guardian', 'Phone', 'Email', 'Address', 'Fee Status', 'Attendance'],
      ...filteredStudents.map(student => [
        student.id,
        student.name,
        student.class,
        student.age,
        student.guardianName,
        student.phone,
        student.email,
        student.address,
        student.feeStatus,
        `${student.attendance}%`
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Student data has been exported to CSV file.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Manage student records, admissions, and information</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setShowAddForm(true)}
        >
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
            <Button variant="outline" onClick={handleFilter}>
              <Filter className="w-4 h-4 mr-2" />
              Filter {filterClass && `(${filterClass})`}
            </Button>
            <Button variant="outline" onClick={handleExport}>
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
            <div className="text-2xl font-bold text-blue-600">{students.length}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{students.filter(s => s.feeStatus === 'paid').length}</div>
            <div className="text-sm text-gray-600">Fees Paid</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{students.filter(s => s.feeStatus === 'pending').length}</div>
            <div className="text-sm text-gray-600">Pending Fees</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Attendance</div>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Student Records ({filteredStudents.length})</CardTitle>
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
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewStudent(student)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCompleteStudentCourse(student)}
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        <GraduationCap className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showAddForm && (
        <AddStudentForm
          onClose={() => setShowAddForm(false)}
          onSave={handleAddStudent}
        />
      )}

      {showDetails && selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => {
            setShowDetails(false);
            setSelectedStudent(null);
          }}
        />
      )}

      {showCourseCompletion && selectedStudent && (
        <CourseCompletionModal
          student={selectedStudent}
          onClose={() => {
            setShowCourseCompletion(false);
            setSelectedStudent(null);
          }}
          onComplete={handleCourseCompletion}
        />
      )}
    </div>
  );
};

export default StudentManagement;
