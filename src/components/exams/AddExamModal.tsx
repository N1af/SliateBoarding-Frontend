
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, BookOpen } from 'lucide-react';

interface AddExamModalProps {
  onClose: () => void;
  onSave: (examData: any) => void;
}

const AddExamModal: React.FC<AddExamModalProps> = ({ onClose, onSave }) => {
  const [examData, setExamData] = useState({
    examName: '',
    staffName: '',
    studentName: '',
    moduleName: '',
    className: '',
    date: '',
    totalMarks: 100
  });

  const handleSave = () => {
    if (examData.examName && examData.staffName && examData.moduleName && examData.className) {
      onSave(examData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-[500px] max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span>Add New Exam</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="examName">Exam Name *</Label>
              <Input
                id="examName"
                placeholder="Enter exam name"
                value={examData.examName}
                onChange={(e) => setExamData({...examData, examName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="staffName">Staff Name *</Label>
              <Input
                id="staffName"
                placeholder="Enter staff name"
                value={examData.staffName}
                onChange={(e) => setExamData({...examData, staffName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name (Optional)</Label>
              <Input
                id="studentName"
                placeholder="Enter specific student name if individual exam"
                value={examData.studentName}
                onChange={(e) => setExamData({...examData, studentName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="moduleName">Module Name *</Label>
              <Input
                id="moduleName"
                placeholder="Enter module/subject name"
                value={examData.moduleName}
                onChange={(e) => setExamData({...examData, moduleName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="className">Class *</Label>
              <select
                id="className"
                value={examData.className}
                onChange={(e) => setExamData({...examData, className: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Class</option>
                <option value="Class 6A">Class 6A</option>
                <option value="Class 6B">Class 6B</option>
                <option value="Class 7A">Class 7A</option>
                <option value="Class 7B">Class 7B</option>
                <option value="Class 8A">Class 8A</option>
                <option value="Class 8B">Class 8B</option>
                <option value="Class 9A">Class 9A</option>
                <option value="Class 9B">Class 9B</option>
                <option value="Class 10A">Class 10A</option>
                <option value="Class 10B">Class 10B</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Exam Date</Label>
              <Input
                id="date"
                type="date"
                value={examData.date}
                onChange={(e) => setExamData({...examData, date: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                value={examData.totalMarks}
                onChange={(e) => setExamData({...examData, totalMarks: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              Create Exam
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExamModal;
