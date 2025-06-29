
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, BookOpen, Users } from 'lucide-react';
import AddExamModal from './AddExamModal';
import ExamMarkingModal from './ExamMarkingModal';
import { useToast } from '@/hooks/use-toast';

const ExamManagement: React.FC = () => {
  const [showAddExam, setShowAddExam] = useState(false);
  const [showMarking, setShowMarking] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const { toast } = useToast();

  const [exams, setExams] = useState([
    {
      id: 'EX001',
      examName: 'Islamic Studies Mid-Term',
      staffName: 'Ustad Ahmed',
      moduleName: 'Quran Recitation',
      className: 'Class 8A',
      date: '2024-02-15',
      totalMarks: 100,
      studentsCount: 25,
      markedCount: 15
    },
    {
      id: 'EX002',
      examName: 'Arabic Language Final',
      staffName: 'Ustaza Fatima',
      moduleName: 'Arabic Grammar',
      className: 'Class 7B',
      date: '2024-02-20',
      totalMarks: 80,
      studentsCount: 22,
      markedCount: 22
    }
  ]);

  const handleAddExam = (examData: any) => {
    const newExam = {
      id: `EX${String(exams.length + 1).padStart(3, '0')}`,
      ...examData,
      studentsCount: Math.floor(Math.random() * 30) + 15,
      markedCount: 0
    };
    setExams([...exams, newExam]);
    toast({
      title: "Exam Added",
      description: `${examData.examName} has been successfully created.`,
    });
  };

  const handleMarkExam = (exam: any) => {
    setSelectedExam(exam);
    setShowMarking(true);
  };

  const handleSaveMarks = (marksData: any) => {
    setExams(exams.map(exam => 
      exam.id === selectedExam.id 
        ? { ...exam, markedCount: exam.studentsCount }
        : exam
    ));
    toast({
      title: "Marks Saved",
      description: `Marks for ${selectedExam.examName} have been saved successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exam Management</h1>
          <p className="text-gray-600">Manage exams, assignments, and student assessments</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setShowAddExam(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Exam
        </Button>
      </div>

      {/* Exam Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{exams.length}</div>
            <div className="text-sm text-gray-600">Total Exams</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {exams.filter(e => e.markedCount === e.studentsCount).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {exams.filter(e => e.markedCount > 0 && e.markedCount < e.studentsCount).length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {exams.filter(e => e.markedCount === 0).length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* Exams List */}
      <Card>
        <CardHeader>
          <CardTitle>Examination Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exams.map((exam) => (
              <div key={exam.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exam.examName}</h3>
                      <p className="text-sm text-gray-600">
                        {exam.staffName} • {exam.moduleName} • {exam.className}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">
                          Date: {new Date(exam.date).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          Total Marks: {exam.totalMarks}
                        </span>
                        <span className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {exam.studentsCount} Students
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <Badge 
                        variant={exam.markedCount === exam.studentsCount ? 'default' : 
                                exam.markedCount > 0 ? 'secondary' : 'outline'}
                        className={
                          exam.markedCount === exam.studentsCount ? 'bg-green-100 text-green-800' :
                          exam.markedCount > 0 ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'
                        }
                      >
                        {exam.markedCount === exam.studentsCount ? 'Complete' :
                         exam.markedCount > 0 ? 'In Progress' : 'Pending'}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        Marked: {exam.markedCount}/{exam.studentsCount}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleMarkExam(exam)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                      >
                        <Eye className="w-4 h-4" />
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
      {showAddExam && (
        <AddExamModal
          onClose={() => setShowAddExam(false)}
          onSave={handleAddExam}
        />
      )}

      {showMarking && selectedExam && (
        <ExamMarkingModal
          exam={selectedExam}
          onClose={() => {
            setShowMarking(false);
            setSelectedExam(null);
          }}
          onSave={handleSaveMarks}
        />
      )}
    </div>
  );
};

export default ExamManagement;
