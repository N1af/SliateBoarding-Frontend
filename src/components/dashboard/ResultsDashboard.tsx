
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, TrendingUp, Users, Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResultsDashboard: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const { toast } = useToast();

  const [studentResults, setStudentResults] = useState([
    {
      id: 'ST001',
      name: 'Ahmed Hassan',
      class: 'Class 8A',
      exams: [
        { name: 'Islamic Studies Mid-Term', marks: 85, total: 100, grade: 'A' },
        { name: 'Arabic Language Quiz', marks: 78, total: 80, grade: 'B+' }
      ],
      average: 81.5,
      overallGrade: 'A-'
    },
    {
      id: 'ST002',
      name: 'Fatima Khan',
      class: 'Class 7B',
      exams: [
        { name: 'Quran Recitation Test', marks: 92, total: 100, grade: 'A+' },
        { name: 'Islamic History', marks: 88, total: 100, grade: 'A' }
      ],
      average: 90,
      overallGrade: 'A+'
    },
    {
      id: 'ST003',
      name: 'Omar Abdullah',
      class: 'Class 6A',
      exams: [
        { name: 'Mathematics Test', marks: 75, total: 100, grade: 'B+' },
        { name: 'Science Quiz', marks: 82, total: 100, grade: 'A-' }
      ],
      average: 78.5,
      overallGrade: 'B+'
    }
  ]);

  const classResults = [
    { class: 'Class 6A', students: 24, avgScore: 78.5, topStudent: 'Aisha Mohamed' },
    { class: 'Class 6B', students: 22, avgScore: 82.1, topStudent: 'Hassan Ali' },
    { class: 'Class 7A', students: 26, avgScore: 85.3, topStudent: 'Omar Abdullah' },
    { class: 'Class 7B', students: 23, avgScore: 79.8, topStudent: 'Fatima Khan' },
    { class: 'Class 8A', students: 25, avgScore: 81.2, topStudent: 'Ahmed Hassan' }
  ];

  const handleDeleteResult = (studentId: string) => {
    setStudentResults(studentResults.filter(student => student.id !== studentId));
    toast({
      title: "Result Deleted",
      description: "Student result has been deleted successfully.",
    });
  };

  const handleClearAllData = () => {
    setStudentResults([]);
    toast({
      title: "All Data Cleared",
      description: "All results data has been cleared successfully.",
    });
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredResults = selectedClass === 'all' 
    ? studentResults 
    : studentResults.filter(student => student.class === selectedClass);

  const classes = ['all', ...Array.from(new Set(studentResults.map(student => student.class)))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
          <p className="text-gray-600">View student performance and academic progress</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={handleClearAllData}
            className="text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All Data
          </Button>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            {classes.map(className => (
              <option key={className} value={className}>
                {className === 'all' ? 'All Classes' : className}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{filteredResults.length}</div>
            <div className="text-sm text-gray-600">Total Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredResults.length > 0 ? 
                (filteredResults.reduce((acc, s) => acc + s.average, 0) / filteredResults.length).toFixed(1) + '%'
                : '0%'
              }
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {filteredResults.filter(s => s.overallGrade.startsWith('A')).length}
            </div>
            <div className="text-sm text-gray-600">A Grade Students</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {selectedClass === 'all' ? classes.length - 1 : 1}
            </div>
            <div className="text-sm text-gray-600">Classes</div>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Class Performance Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classResults
              .filter(classData => selectedClass === 'all' || classData.class === selectedClass)
              .map((classData) => (
              <div key={classData.class} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{classData.class}</h3>
                    <p className="text-sm text-gray-600">
                      {classData.students} students • Top: {classData.topStudent}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">
                      {classData.avgScore}%
                    </div>
                    <div className="text-sm text-gray-500">Class Average</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Individual Student Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Student Results ({filteredResults.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredResults.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-700 font-semibold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.class} • ID: {student.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-xl font-bold text-emerald-600">
                        {student.average}%
                      </div>
                      <Badge className={getGradeColor(student.overallGrade)}>
                        {student.overallGrade}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteResult(student.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Recent Exams:</h4>
                  {student.exams.map((exam, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-2">
                      <span className="text-sm">{exam.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {exam.marks}/{exam.total}
                        </span>
                        <Badge className={getGradeColor(exam.grade)}>
                          {exam.grade}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDashboard;
