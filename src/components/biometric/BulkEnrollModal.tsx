
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Users, Plus, Trash2 } from 'lucide-react';

interface BulkEnrollModalProps {
  onClose: () => void;
  onSave: (data: any[]) => void;
  scanningMode: 'laptop' | 'machine';
}

const BulkEnrollModal: React.FC<BulkEnrollModalProps> = ({
  onClose,
  onSave,
  scanningMode
}) => {
  const [students, setStudents] = useState([
    { studentId: '', studentName: '' }
  ]);

  const addStudent = () => {
    setStudents([...students, { studentId: '', studentName: '' }]);
  };

  const removeStudent = (index: number) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const updateStudent = (index: number, field: string, value: string) => {
    const updated = students.map((student, i) => 
      i === index ? { ...student, [field]: value } : student
    );
    setStudents(updated);
  };

  const handleSave = () => {
    const validStudents = students.filter(s => s.studentId && s.studentName);
    if (validStudents.length > 0) {
      onSave(validStudents);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-[600px] max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Bulk Fingerprint Enrollment</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Using: {scanningMode === 'laptop' ? 'Laptop Sensor' : 'Fingerprint Machine'}
          </div>

          {students.map((student, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label>Student {index + 1}</Label>
                {students.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeStudent(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`studentId-${index}`}>Student ID</Label>
                  <Input
                    id={`studentId-${index}`}
                    value={student.studentId}
                    onChange={(e) => updateStudent(index, 'studentId', e.target.value)}
                    placeholder="Enter student ID"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`studentName-${index}`}>Student Name</Label>
                  <Input
                    id={`studentName-${index}`}
                    value={student.studentName}
                    onChange={(e) => updateStudent(index, 'studentName', e.target.value)}
                    placeholder="Enter student name"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={addStudent}>
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
            
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Enroll All Fingerprints
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkEnrollModal;
