
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Save, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExamMarkingModalProps {
  exam: any;
  onClose: () => void;
  onSave: (marksData: any) => void;
}

const ExamMarkingModal: React.FC<ExamMarkingModalProps> = ({ exam, onClose, onSave }) => {
  const { toast } = useToast();
  
  const [students] = useState([
    { id: 'ST001', name: 'Ahmed Hassan', marks: 85, grade: 'A' },
    { id: 'ST002', name: 'Fatima Khan', marks: 78, grade: 'B+' },
    { id: 'ST003', name: 'Omar Abdullah', marks: 92, grade: 'A+' },
    { id: 'ST004', name: 'Aisha Mohamed', marks: 75, grade: 'B' },
    { id: 'ST005', name: 'Hassan Ali', marks: 88, grade: 'A-' }
  ]);

  const [marks, setMarks] = useState(
    students.reduce((acc, student) => ({
      ...acc,
      [student.id]: student.marks
    }), {})
  );

  const getGrade = (mark: number, totalMarks: number) => {
    const percentage = (mark / totalMarks) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 75) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 65) return 'B-';
    if (percentage >= 60) return 'C+';
    if (percentage >= 55) return 'C';
    if (percentage >= 50) return 'C-';
    return 'F';
  };

  const handleMarkChange = (studentId: string, mark: string) => {
    const numMark = parseInt(mark) || 0;
    if (numMark <= exam.totalMarks) {
      setMarks({ ...marks, [studentId]: numMark });
    }
  };

  const handleSave = () => {
    const marksData = students.map(student => ({
      studentId: student.id,
      studentName: student.name,
      marks: marks[student.id] || 0,
      grade: getGrade(marks[student.id] || 0, exam.totalMarks)
    }));
    
    onSave(marksData);
    toast({
      title: "Marks Saved",
      description: "All student marks have been saved successfully",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-[700px] max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-emerald-600" />
            <div>
              <span>Mark Exam: {exam.examName}</span>
              <p className="text-sm font-normal text-gray-600 mt-1">
                {exam.className} • {exam.moduleName} • Total Marks: {exam.totalMarks}
              </p>
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-700 font-semibold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{student.name}</h4>
                      <p className="text-sm text-gray-600">ID: {student.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                      <Label htmlFor={`marks-${student.id}`} className="text-sm">
                        Marks (/{exam.totalMarks})
                      </Label>
                      <Input
                        id={`marks-${student.id}`}
                        type="number"
                        className="w-20 text-center"
                        min="0"
                        max={exam.totalMarks}
                        value={marks[student.id] || ''}
                        onChange={(e) => handleMarkChange(student.id, e.target.value)}
                      />
                    </div>
                    
                    <div className="text-center">
                      <Label className="text-sm">Grade</Label>
                      <div className="mt-1">
                        <Badge 
                          variant="outline"
                          className={`${
                            getGrade(marks[student.id] || 0, exam.totalMarks).startsWith('A') 
                              ? 'bg-green-100 text-green-800' 
                              : getGrade(marks[student.id] || 0, exam.totalMarks).startsWith('B')
                              ? 'bg-blue-100 text-blue-800'
                              : getGrade(marks[student.id] || 0, exam.totalMarks).startsWith('C')
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {getGrade(marks[student.id] || 0, exam.totalMarks)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              <Save className="w-4 h-4 mr-2" />
              Save All Marks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamMarkingModal;
